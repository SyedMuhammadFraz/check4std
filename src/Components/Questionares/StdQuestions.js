import React, { useState, useEffect } from "react";
import {CheckCircle, AlertCircle, User, FileText, ArrowRight, ArrowLeft, Calendar} from "lucide-react";
import "./StdQuestions.css";
import { useContext } from "react";
import { webApiInstance } from "../../AxiosInstance";
import { useQuestionnaire } from "../../utils/QuestionareContext";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";

const QUESTION_TYPE_MAP = {
  19: "multiselect",
  20: "radio",
  21: "text",
  22: "date",
};

const STDQuestionnaireSystem = () => {
  const [currentStep, setCurrentStep] = useState("selection");
  const [questionnaireType, setQuestionnaireType] = useState("");
  const [responses, setResponses] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);
  const { authToken } = useContext(AuthContext);
  const { setQuestionnaireId, setHasSymptoms, setStdQuestionsFilled } = useQuestionnaire();
  const [alreadyFilled, setAlreadyFilled] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!authToken) return;

    webApiInstance
      .get("/QuestionaireResponse/is-questionaire-filled", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(res => {
        if (res.data?.result === true) {
          setAlreadyFilled(true);
        }
      })
      .catch(() => {
        toast.error("Failed to verify questionnaire status. Please try again later.");
      });
  }, [authToken]);

  useEffect(() => {
    window.history.pushState(null, "", location.pathname);
    const blockBack = () => {
      window.history.pushState(null, "", location.pathname);
    };
    window.addEventListener("popstate", blockBack);

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", blockBack);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);

  useEffect(() => {
    if (!questionnaireType || !authToken) return;
    setLoading(true);
    setError(null);

    const questionnaireId = questionnaireType === "symptoms" ? 2 : 4;
    if (questionnaireId === 2) {
      setQuestionnaireId(questionnaireId);
      setHasSymptoms(true);
    } else if (questionnaireId === 4) {
      setHasSymptoms(false);
    }

    webApiInstance
      .get(`Question/by-questionnaire/${questionnaireId}`)
      .then((res) => {
        const apiQuestions = res.data?.result || [];
        const mapped = apiQuestions.map((q) => ({
          id: q.id,
          question: q.questionText,
          type: QUESTION_TYPE_MAP[q.questionType] || "text",
          options: q.options?.map((o) => ({
            id: o.id,
            text: o.optionText,
          })) || [],
        }));
        setQuestions(mapped);
      })
      .catch(() => {
        setError("Failed to load questions. Please try again.");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [questionnaireType, setHasSymptoms, setQuestionnaireId]);

  const handleSubmit = async () => {
    const now = new Date().toISOString();
    const questionnaireId = questionnaireType === "symptoms" ? 2 : 4;

    const responsesArray = Object.entries(responses).flatMap(
    ([questionId, value]) => {
      const vals = Array.isArray(value) ? value : [value];

      return vals.map((answer) => {
        const question = questions.find((q) => q.id === Number(questionId));
        let optionId = 0;

        if (question?.options?.length > 0) {
          const matched = question.options.find((o) => o.text === answer);
          if (matched) optionId = matched.id;
        }

      // Build the base object
      const base = {
        questionId: Number(questionId),
      };

      // Decide which key to include
      if (optionId) {
        // Predefined option chosen → only optionId
        return { ...base, optionId };
      } else {
        // Free-text answer → only textAnswer
        return { ...base, textAnswer: answer };
      }
    });
  });


  const payload = {
    questionaireId: questionnaireId,
    responses: responsesArray,
  };


  try {
    await webApiInstance.post("/QuestionaireResponse", 
      payload, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const statusRes = await webApiInstance.get(
    "/QuestionaireResponse/is-questionaire-filled",
    {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (statusRes.data?.result === true) {
      setStdQuestionsFilled(true);
    }
  } catch (err) {
    console.error("Failed to save questionnaire:", err);
    return;
  }

    setIsCompleted(true);
    setCompletionDate(now);
    setCurrentStep("results");
  };

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMultiSelectChange = (questionId, option) => {
    setResponses((prev) => {
      const currentValues = prev[questionId] || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      return {
        ...prev,
        [questionId]: newValues,
      };
    });
  };

  const renderQuestion = (question, index) => (
    <div key={question.id} className="std-questionnaire-question-container">
      <label className="std-questionnaire-question-label">
        {index + 1}. {question.question}
      </label>

      {question.type === "radio" && (
        <div className="std-questionnaire-options-container">
          {question.options.map((option) => (
            <label
              key={option.id}
              className="std-questionnaire-option-label"
            >
              <input
                type="radio"
                name={question.id}
                value={option.text}
                checked={responses[question.id] === option.text}
                onChange={(e) =>
                  handleResponseChange(question.id, e.target.value)
                }
                className="std-questionnaire-input"
              />
              {option.text}
            </label>
          ))}
        </div>
      )}

      {question.type === "multiselect" && (
        <div className="std-questionnaire-options-container">
          {question.options.map((option) => (
            <label
              key={option.id}
              className="std-questionnaire-option-label"
            >
              <input
                type="checkbox"
                checked={(responses[question.id] || []).includes(option.text)}
                onChange={() =>
                  handleMultiSelectChange(question.id, option.text)
                }
                className="std-questionnaire-input"
              />
              {option.text}
            </label>
          ))}
        </div>
      )}

      {question.type === "text" && (
        <input
          type="text"
          value={responses[question.id] || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          className="std-questionnaire-input"
        />
      )}

      {question.type === "number" && (
        <input
          type="number"
          value={responses[question.id] || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          className="std-questionnaire-input"
        />
      )}

      {question.type === "date" && (
        <input
          type="date"
          value={responses[question.id] || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          className="std-questionnaire-input"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={responses[question.id] || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          rows="3"
          className="std-questionnaire-textarea"
        />
      )}
    </div>
  );

  if(!authToken){
    return (
      <div className="std-questionnaire-container std-questionnaire-message">
        <h1 className="message-title">Login Required</h1>
        <p className="message-text">
          Only logged-in users can fill out this STD/STI questionnaire.
        </p>
        <p className="message-note">
          Please log in to continue and ensure your responses are saved securely.
        </p>
      </div>
    );
  }

  if (alreadyFilled) {
    return (
      <div className="std-questionnaire-container std-questionnaire-message">
        <h1 className="message-title">Assessment Already Completed</h1>
        <p className="message-text">
          You have already completed this STD/STI questionnaire.  
          For your safety and accurate guidance, you cannot retake it at this time.
        </p>
        <p className="message-note">
          If you believe this is an error or need to update your information, please contact your healthcare provider.
        </p>
      </div>
    );
  }

  if (currentStep === "selection") {
  return (
    <div className="std-questionnaire-container">
      {/* Title */}
      <h1 className="std-questionnaire-title">STD/STI Health Assessment</h1>

      {/* Subtitle / Instructions */}
      <p className="std-questionnaire-subtitle">
        Please select the questionnaire that best describes your situation.
        <br />
        <strong>Instructions:</strong> Click on a card below based on whether 
        you are experiencing symptoms or have had potential exposure. This will 
        guide you to the appropriate set of questions.
      </p>

      {/* Selection Cards */}
      <div className="std-questionnaire-grid std-questionnaire-grid-2">
        {/* Symptoms Card */}
        <div
          className="std-questionnaire-selection-card symptoms"
          onClick={() => {
            setQuestionnaireType("symptoms");
            setCurrentStep("questionnaire");
          }}
        >
          <h2>I Have Symptoms</h2>
          <p>
            Use this questionnaire if you are experiencing any STD/STI related symptoms such as:
          </p>
          <ul>
            <li>Unusual discharge</li>
            <li>Itching or irritation</li>
            <li>Pain during urination</li>
          </ul>
        </div>

        {/* Exposure Card */}
        <div
          className="std-questionnaire-selection-card exposure"
          onClick={() => {
            setQuestionnaireType("exposure");
            setCurrentStep("questionnaire");
          }}
        >
          <h2>Potential Exposure</h2>
          <p>
            Use this questionnaire if you may have been exposed to an STD/STI, for example:
          </p>
          <ul>
            <li>Unprotected sexual contact</li>
            <li>Partner diagnosed with an STD/STI</li>
            <li>Shared needles or other exposure risks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


  if (currentStep === "questionnaire") {
    return (
      <div className="std-questionnaire-container">
        {loading ? (
          <div>Loading questions...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            {questions.map((question, index) =>
              renderQuestion(question, index)
            )}
            <div className="std-questionnaire-mt-8">
              <button
                onClick={handleSubmit}
                className="std-questionnaire-btn std-questionnaire-btn-primary"
              >
                Complete Assessment
                <ArrowRight size={20} className="std-questionnaire-ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === "results") {
    return (
      <div className="std-questionnaire-container">
        <h1>Assessment Complete</h1>
        <p>Completed: {new Date(completionDate).toLocaleDateString()}</p>
      </div>
    );
  }

  return null;
};

export default STDQuestionnaireSystem;
