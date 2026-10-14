import React, { useState, useEffect } from "react";
import "../Journey/journey.css";
import { useContext } from "react";
import { webApiInstance } from "../../AxiosInstance";
import { useQuestionnaire } from "../../utils/QuestionareContext";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

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
  const [accessRestrictions, setAccessRestrictions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);
  const { authToken } = useContext(AuthContext);
  const [hasHighRisk, setHasHighRisk] = useState(false);
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
      .catch(() => {});
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

  // Fetch questions
  useEffect(() => {
    if (!questionnaireType) return;
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

  // Restriction logic
  const calculateRestrictions = () => {
    const restrictions = [];
    let highRisk = false;

    const selectedSymptoms = responses[11] || [];
    const highRiskSymptoms = [
      "Sores, bumps, or blisters on or around genitals, anus, or mouth",
      "Genital discharge (penile/vaginal/rectal)",
      "Fever or flu-like symptoms",
    ];
    const urgentSymptoms = [
      "Burning during urination",
      "Pelvic or lower abdominal pain",
      "Unusual vaginal bleeding",
    ];

    if (questionnaireType === "symptoms") {
      const hasHighRiskSymptoms = selectedSymptoms?.some((symptom) =>
        highRiskSymptoms.includes(symptom)
      );
      const hasUrgentSymptoms = selectedSymptoms?.some((symptom) =>
        urgentSymptoms.includes(symptom)
      );

      if (hasHighRiskSymptoms) {
        restrictions.push("URGENT_CARE_REQUIRED");
        restrictions.push("RESTRICTED_SOCIAL_ACTIVITIES");
        highRisk = true;
      }
      if (hasUrgentSymptoms) {
        restrictions.push("MEDICAL_CONSULTATION_RECOMMENDED");
        highRisk = true;
      }
      if (responses[16] === "Never") {
        restrictions.push("ENHANCED_TESTING_REQUIRED");
      }
      if (responses[18] === "Yes") {
        restrictions.push("PARTNER_NOTIFICATION_REQUIRED");
        highRisk = true;
      }
      if (responses[13] === "Gotten worse") {
        restrictions.push("WORSENING_SYMPTOMS");
        highRisk = true;
      }
    }

    setAccessRestrictions(restrictions);
    setHasHighRisk(highRisk);
  };

  // Submit
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

  console.log(payload)

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
    <div key={question.id} className="j-question">
      <label htmlFor={`question-${question.id}`}>
        {index + 1}. {question.question}
      </label>

      {question.type === "radio" && (
        <div className="j-options">
          {question.options.map((option) => (
            <label key={option.id} className="j-option">
              <input
                type="radio"
                name={String(question.id)}
                value={option.text}
                checked={responses[question.id] === option.text}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "multiselect" && (
        <div className="j-options">
          {question.options.map((option) => (
            <label key={option.id} className="j-option">
              <input
                type="checkbox"
                checked={(responses[question.id] || []).includes(option.text)}
                onChange={() => handleMultiSelectChange(question.id, option.text)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {(question.type === "text" ||
        question.type === "number" ||
        question.type === "date") && (
        <div className="j-options">
          <input
            id={`question-${question.id}`}
            type={question.type}
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
          />
        </div>
      )}

      {question.type === "textarea" && (
        <div className="j-options">
          <textarea
            id={`question-${question.id}`}
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows="3"
          />
        </div>
      )}
    </div>
  );

  const shell = (children) => (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-eyebrow">SATELLITE HEALTH · STD ASSESSMENT</div>
        {children}
      </div>
    </section>
  );

  if (alreadyFilled) {
    return shell(
      <div className="j-auth-shell">
        <h1 className="j-title">Assessment already completed.</h1>
        <p className="j-intro">
          You have already completed this STD/STI questionnaire. For your safety and accurate
          guidance, you cannot retake it at this time.
        </p>
        <div className="j-panel">
          <h3>Need to change an answer?</h3>
          <p className="j-hint">
            If you believe this is an error or need to update your information, please contact your
            healthcare provider.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === "selection") {
    return shell(
      <>
        <h1 className="j-title">Let's understand your needs.</h1>
        <p className="j-intro">
          Choose the questionnaire that best describes your situation. Your answers give a clinician
          discussion points — they do not diagnose an STI or choose a test for you.
        </p>
        <div className="j-cards">
          <button
            type="button"
            className="j-card"
            onClick={() => {
              setQuestionnaireType("symptoms");
              setCurrentStep("questionnaire");
            }}
          >
            <span className="j-tag">I HAVE SYMPTOMS</span>
            <h3>I'm experiencing symptoms</h3>
            <p>Use this questionnaire if you have STD/STI related symptoms such as:</p>
            <ul>
              <li>Unusual discharge</li>
              <li>Itching or irritation</li>
              <li>Pain during urination</li>
            </ul>
            <span className="j-button">Start this assessment</span>
          </button>

          <button
            type="button"
            className="j-card"
            onClick={() => {
              setQuestionnaireType("exposure");
              setCurrentStep("questionnaire");
            }}
          >
            <span className="j-tag">POTENTIAL EXPOSURE</span>
            <h3>I may have been exposed</h3>
            <p>Use this questionnaire if you may have been exposed to an STD/STI, for example:</p>
            <ul>
              <li>Unprotected sexual contact</li>
              <li>Partner diagnosed with an STD/STI</li>
              <li>Shared needles or other exposure risks</li>
            </ul>
            <span className="j-button">Start this assessment</span>
          </button>
        </div>
      </>
    );
  }

  if (currentStep === "questionnaire") {
    return shell(
      <>
        <h1 className="j-title">A few questions.</h1>
        <p className="j-intro">
          Answer as fully as you can. Your responses are shared with the clinician reviewing your
          order.
        </p>
        {loading ? (
          <div className="j-panel">
            <p className="j-hint">Loading questions…</p>
          </div>
        ) : error ? (
          <div className="j-panel">
            <p className="j-error" role="alert">
              {error}
            </p>
          </div>
        ) : (
          <div className="j-panel">
            {questions.map((question, index) => renderQuestion(question, index))}
            <div className="j-actions">
              <button
                type="button"
                className="j-button j-button--secondary"
                onClick={() => setCurrentStep("selection")}
              >
                Back
              </button>
              <button type="button" className="j-button" onClick={handleSubmit}>
                Complete assessment
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (currentStep === "results") {
    return shell(
      <div className="j-auth-shell">
        <div className="j-success">✓</div>
        <h1 className="j-title">Assessment complete.</h1>
        <p className="j-intro">
          Completed {new Date(completionDate).toLocaleDateString()}. Thank you — your answers are
          saved.
        </p>
        <div className="j-banner">
          <h3>Your next step</h3>
          <p className="j-hint">
            Discuss your responses and test timing with a clinician. This assessment does not
            produce a diagnosis or a risk score.
          </p>
          <div className="j-actions">
            <Link className="j-button" to="/doctor-consultation">
              Talk to a clinician
            </Link>
            <Link className="j-button j-button--secondary" to="/price-packages">
              Browse testing options
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default STDQuestionnaireSystem;
