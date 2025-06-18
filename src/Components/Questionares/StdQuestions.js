import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, User, FileText, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import './StdQuestions.css';

const STDQuestionnaireSystem = () => {
  const [currentStep, setCurrentStep] = useState('selection');
  const [questionnaireType, setQuestionnaireType] = useState('');
  const [responses, setResponses] = useState({});
  const [accessRestrictions, setAccessRestrictions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);
  const [hasHighRisk, setHasHighRisk] = useState(false);

  // Block navigation to /order page if high risk
  useEffect(() => {
    const blockOrderNavigation = (event) => {
      if (hasHighRisk && window.location.pathname === '/order') {
        event.preventDefault();
        alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
        window.history.back();
      }
    };

    if (hasHighRisk) {
      window.addEventListener('popstate', blockOrderNavigation);
      
      // Also block direct navigation attempts
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(state, title, url) {
        if (url && url.includes('/order')) {
          alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
          return;
        }
        return originalPushState.apply(this, arguments);
      };
      
      window.history.replaceState = function(state, title, url) {
        if (url && url.includes('/order')) {
          alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
          return;
        }
        return originalReplaceState.apply(this, arguments);
      };
      
      return () => {
        window.removeEventListener('popstate', blockOrderNavigation);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [hasHighRisk]);

  // Questionnaire 1: With Symptoms
  const symptomsQuestions = [
    {
      id: 'symptoms',
      question: 'What symptoms are you currently experiencing?',
      type: 'multiselect',
      options: [
        'Burning during urination',
        'Genital discharge (penile/vaginal/rectal)',
        'Itching or irritation in genital area',
        'Sores, bumps, or blisters on or around genitals, anus, or mouth',
        'Pelvic or lower abdominal pain',
        'Unusual vaginal bleeding',
        'Pain during intercourse',
        'Rash on hands, feet, or other areas',
        'Swollen lymph nodes',
        'Fever or flu-like symptoms'
      ]
    },
    {
      id: 'symptom_onset',
      question: 'When did you first notice these symptoms?',
      type: 'date',
      placeholder: 'Enter date or approximate timeframe'
    },
    {
      id: 'symptom_progression',
      question: 'Have these symptoms gotten worse, stayed the same, or improved since they started?',
      type: 'radio',
      options: ['Gotten worse', 'Stayed the same', 'Improved']
    },
    {
      id: 'recent_contact',
      question: 'Have you had any recent sexual contact within the past 3 months?',
      type: 'radio',
      options: ['Yes', 'No']
    },
    {
      id: 'sexual_activities',
      question: 'If yes, what type(s) of sexual activity have you engaged in recently?',
      type: 'multiselect',
      conditional: 'recent_contact',
      conditionalValue: 'Yes',
      options: ['Vaginal sex', 'Oral sex', 'Anal sex', 'Other (please specify)']
    },
    {
      id: 'protection_used',
      question: 'Did you use protection (e.g., condoms or dental dams) during these encounters?',
      type: 'radio',
      conditional: 'recent_contact',
      conditionalValue: 'Yes',
      options: ['Always', 'Sometimes', 'Never']
    },
    {
      id: 'past_diagnosis',
      question: 'Have you been diagnosed with an STD/STI in the past? If yes, which one(s)?',
      type: 'text',
      placeholder: 'List any previous STD/STI diagnoses'
    },
    {
      id: 'partner_status',
      question: 'Do you know if your recent sexual partner(s) have tested positive for an STD/STI?',
      type: 'radio',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 'current_medications',
      question: 'Are you currently taking any medications or receiving treatment for any infections or conditions?',
      type: 'text',
      placeholder: 'List current medications or treatments'
    },
    {
      id: 'allergies',
      question: 'Do you have any known allergies to medications (especially antibiotics)?',
      type: 'text',
      placeholder: 'List any medication allergies'
    },
    {
      id: 'pregnancy_status',
      question: 'Are you currently pregnant or trying to conceive? (if applicable)',
      type: 'radio',
      options: ['Yes', 'No', 'N/A']
    },
    {
      id: 'additional_info',
      question: 'Is there anything else about your sexual health or symptoms you think we should know?',
      type: 'textarea',
      placeholder: 'Any additional information...'
    }
  ];

  // Questionnaire 2: Without Symptoms
  const exposureQuestions = [
    {
      id: 'testing_reason',
      question: 'What prompted you to seek STD/STI testing today?',
      type: 'text',
      placeholder: 'e.g., recent unprotected sex, new partner, partner tested positive, routine screening, etc.'
    },
    {
      id: 'last_encounter',
      question: 'When was your last sexual encounter?',
      type: 'date',
      placeholder: 'Approximate date'
    },
    {
      id: 'sexual_activities',
      question: 'What type(s) of sexual activity have you engaged in recently?',
      type: 'multiselect',
      options: ['Vaginal sex', 'Oral sex', 'Anal sex', 'Other (please specify)']
    },
    {
      id: 'protection_used',
      question: 'Did you use protection (e.g., condoms or dental dams) during these encounters?',
      type: 'radio',
      options: ['Always', 'Sometimes', 'Never']
    },
    {
      id: 'partner_count',
      question: 'How many sexual partners have you had in the past 3 months?',
      type: 'number',
      placeholder: 'Number of partners'
    },
    {
      id: 'partner_status',
      question: 'Do you know if any of your recent partners have tested positive for an STD/STI?',
      type: 'radio',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 'past_diagnosis',
      question: 'Have you ever tested positive for an STD/STI in the past? If yes, which one(s) and when?',
      type: 'text',
      placeholder: 'List any previous STD/STI diagnoses and dates'
    },
    {
      id: 'partner_testing',
      question: 'Do you have any current sexual partners who should also be tested?',
      type: 'radio',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 'prep_pep',
      question: 'Are you currently taking PrEP or PEP for HIV prevention?',
      type: 'radio',
      options: ['Yes', 'No', 'Not sure what that is']
    },
    {
      id: 'medical_conditions',
      question: 'Do you have any medical conditions or are you taking any medications that might affect treatment or testing?',
      type: 'text',
      placeholder: 'List any relevant medical conditions or medications'
    },
    {
      id: 'allergies',
      question: 'Do you have any known allergies to medications (especially antibiotics)?',
      type: 'text',
      placeholder: 'List any medication allergies'
    },
    {
      id: 'testing_preference',
      question: 'Would you prefer at-home testing, lab-based testing, or in-person follow-up if needed?',
      type: 'radio',
      options: ['At-home testing', 'Lab-based testing', 'In-person follow-up']
    }
  ];

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelectChange = (questionId, option) => {
    setResponses(prev => {
      const currentValues = prev[questionId] || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      return {
        ...prev,
        [questionId]: newValues
      };
    });
  };

  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;
    return responses[question.conditional] === question.conditionalValue;
  };

  const calculateRestrictions = () => {
    const restrictions = [];
    let highRisk = false;
    
    // High-risk symptoms
    const highRiskSymptoms = [
      'Sores, bumps, or blisters on or around genitals, anus, or mouth',
      'Genital discharge (penile/vaginal/rectal)',
      'Fever or flu-like symptoms'
    ];
    
    const urgentSymptoms = [
      'Burning during urination',
      'Pelvic or lower abdominal pain',
      'Unusual vaginal bleeding'
    ];
    
    if (questionnaireType === 'symptoms') {
      const selectedSymptoms = responses.symptoms || [];
      const hasHighRiskSymptoms = selectedSymptoms.some(symptom => 
        highRiskSymptoms.includes(symptom)
      );
      
      const hasUrgentSymptoms = selectedSymptoms.some(symptom => 
        urgentSymptoms.includes(symptom)
      );
      
      if (hasHighRiskSymptoms) {
        restrictions.push('URGENT_CARE_REQUIRED');
        restrictions.push('RESTRICTED_SOCIAL_ACTIVITIES');
        highRisk = true;
      }
      
      if (hasUrgentSymptoms) {
        restrictions.push('MEDICAL_CONSULTATION_RECOMMENDED');
        highRisk = true;
      }
      
      if (responses.protection_used === 'Never') {
        restrictions.push('ENHANCED_TESTING_REQUIRED');
      }
      
      if (responses.partner_status === 'Yes') {
        restrictions.push('PARTNER_NOTIFICATION_REQUIRED');
        highRisk = true;
      }
      
      if (responses.symptom_progression === 'Gotten worse') {
        restrictions.push('WORSENING_SYMPTOMS');
        highRisk = true;
      }
    }
    
    if (questionnaireType === 'exposure') {
      if (responses.protection_used === 'Never' && responses.partner_count > 1) {
        restrictions.push('HIGH_RISK_EXPOSURE');
        highRisk = true;
      }
      
      if (responses.partner_status === 'Yes') {
        restrictions.push('CONFIRMED_EXPOSURE');
        restrictions.push('IMMEDIATE_TESTING_REQUIRED');
        highRisk = true;
      }
      
      if (responses.partner_count > 3) {
        restrictions.push('MULTIPLE_PARTNER_RISK');
        highRisk = true;
      }
    }
    
    setAccessRestrictions(restrictions);
    setHasHighRisk(highRisk);
  };

  const handleSubmit = () => {
    calculateRestrictions();
    setIsCompleted(true);
    setCompletionDate(new Date().toISOString());
    setCurrentStep('results');
  };

  const handleDoctorConsultation = () => {
    // Navigate to doctor consultation page
    window.location.href = '/doctor-consultation';
  };

  const getRestrictionMessage = (restriction) => {
    const messages = {
      'URGENT_CARE_REQUIRED': 'Immediate medical attention recommended',
      'RESTRICTED_SOCIAL_ACTIVITIES': 'Avoid intimate contact until cleared by healthcare provider',
      'ENHANCED_TESTING_REQUIRED': 'Comprehensive STI panel recommended',
      'PARTNER_NOTIFICATION_REQUIRED': 'Recent partners should be notified and tested',
      'HIGH_RISK_EXPOSURE': 'High-risk exposure detected - testing recommended',
      'CONFIRMED_EXPOSURE': 'Confirmed exposure to STI - immediate action required',
      'IMMEDIATE_TESTING_REQUIRED': 'Testing should be done within 24-48 hours',
      'MEDICAL_CONSULTATION_RECOMMENDED': 'Medical consultation strongly recommended',
      'WORSENING_SYMPTOMS': 'Symptoms are worsening - seek immediate care',
      'MULTIPLE_PARTNER_RISK': 'Multiple partner exposure increases infection risk'
    };
    return messages[restriction] || restriction;
  };

  const renderQuestion = (question, index) => {
    if (!shouldShowQuestion(question)) return null;

    return (
      <div key={question.id} className="std-questionnaire-question-container">
        <label className="std-questionnaire-question-label">
          {index + 1}. {question.question}
        </label>
        
        {question.type === 'radio' && (
          <div className="std-questionnaire-options-container">
            {question.options.map(option => (
              <label key={option} className="std-questionnaire-option-label">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="std-questionnaire-input"
                />
                {option}
              </label>
            ))}
          </div>
        )}
        
        {question.type === 'multiselect' && (
          <div className="std-questionnaire-options-container">
            {question.options.map(option => (
              <label key={option} className="std-questionnaire-option-label">
                <input
                  type="checkbox"
                  checked={(responses[question.id] || []).includes(option)}
                  onChange={() => handleMultiSelectChange(question.id, option)}
                  className="std-questionnaire-input"
                />
                {option}
              </label>
            ))}
          </div>
        )}
        
        {question.type === 'text' && (
          <input
            type="text"
            placeholder={question.placeholder}
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="std-questionnaire-input"
          />
        )}
        
        {question.type === 'number' && (
          <input
            type="number"
            placeholder={question.placeholder}
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="std-questionnaire-input"
          />
        )}
        
        {question.type === 'date' && (
          <input
            type="date"
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="std-questionnaire-input"
          />
        )}
        
        {question.type === 'textarea' && (
          <textarea
            placeholder={question.placeholder}
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows="3"
            className="std-questionnaire-textarea"
          />
        )}
      </div>
    );
  };

  // Check if questionnaire is already completed
  if (isCompleted && currentStep !== 'results') {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-completion-status">
          <CheckCircle className="std-questionnaire-results-icon" size={48} />
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">Assessment Already Completed</h1>
          <div className="std-questionnaire-completion-info std-questionnaire-mb-6">
            <p className="std-questionnaire-mb-2">
              You have already completed the STD/STI health assessment.
            </p>
            <p>
              Completed on: {new Date(completionDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setCurrentStep('results')}
            className="std-questionnaire-btn std-questionnaire-btn-primary"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'selection') {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-text-center std-questionnaire-mb-8">
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">STD/STI Health Assessment</h1>
          <p className="std-questionnaire-subtitle std-questionnaire-mb-4">Please select the questionnaire that best describes your situation</p>
          <div className="std-questionnaire-alert-warning std-questionnaire-mb-6">
            <div className="std-questionnaire-alert-flex">
              <AlertCircle size={20} />
              <p className="std-questionnaire-alert-text std-questionnaire-alert-text-warning">
                <strong>Important:</strong> This assessment can only be completed once. Please answer all questions carefully and honestly.
              </p>
            </div>
          </div>
        </div>
        
        <div className="std-questionnaire-grid std-questionnaire-grid-2">
          <div 
            className="std-questionnaire-selection-card symptoms"
            onClick={() => {
              setQuestionnaireType('symptoms');
              setCurrentStep('questionnaire');
            }}
          >
            <div className="std-questionnaire-card-header">
              <AlertCircle color="#ef4444" size={24} />
              <h2 className="std-questionnaire-card-title">I Have Symptoms</h2>
            </div>
            <p className="std-questionnaire-card-description std-questionnaire-mb-4">
              Choose this if you are currently experiencing symptoms that may be related to an STD/STI
            </p>
            <ul className="std-questionnaire-card-list">
              <li>• Burning during urination</li>
              <li>• Unusual discharge</li>
              <li>• Genital sores or bumps</li>
              <li>• Other concerning symptoms</li>
            </ul>
          </div>
          
          <div 
            className="std-questionnaire-selection-card exposure"
            onClick={() => {
              setQuestionnaireType('exposure');
              setCurrentStep('questionnaire');
            }}
          >
            <div className="std-questionnaire-card-header">
              <User color="#22c55e" size={24} />
              <h2 className="std-questionnaire-card-title">Potential Exposure</h2>
            </div>
            <p className="std-questionnaire-card-description std-questionnaire-mb-4">
              Choose this if you don't have symptoms but are concerned about potential exposure
            </p>
            <ul className="std-questionnaire-card-list">
              <li>• Recent unprotected sexual activity</li>
              <li>• Partner tested positive</li>
              <li>• Routine screening</li>
              <li>• Peace of mind testing</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questionnaire') {
    const questions = questionnaireType === 'symptoms' ? symptomsQuestions : exposureQuestions;
    
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-nav-header">
          <button 
            onClick={() => setCurrentStep('selection')}
            className="std-questionnaire-btn-back std-questionnaire-nav-back"
          >
            <ArrowLeft size={20} className="std-questionnaire-mr-2" />
            Back
          </button>
          <h1 className="std-questionnaire-title">
            {questionnaireType === 'symptoms' ? 'Symptom Assessment' : 'Exposure Risk Assessment'}
          </h1>
        </div>
        
        <div className="std-questionnaire-alert-info std-questionnaire-mb-6">
          <p className="std-questionnaire-alert-text std-questionnaire-alert-text-info">
            <FileText className="std-questionnaire-mr-2" size={16} />
            Please answer all relevant questions honestly. This information will help determine your risk level and appropriate next steps.
          </p>
        </div>
        
        <div>
          {questions.map((question, index) => renderQuestion(question, index))}
          
          <div className="std-questionnaire-mt-8 std-questionnaire-flex std-questionnaire-flex-end">
            <button
              onClick={handleSubmit}
              className="std-questionnaire-btn std-questionnaire-btn-primary"
            >
              Complete Assessment
              <ArrowRight size={20} className="std-questionnaire-ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-results-header">
          <CheckCircle className="std-questionnaire-results-icon" color="#22c55e" size={48} />
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">Assessment Complete</h1>
        </div>
        
        <div className="std-questionnaire-grid std-questionnaire-grid-2">
          <div className="std-questionnaire-summary-card">
            <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Assessment Summary</h2>
            <p className="std-questionnaire-mb-2">
              <strong>Questionnaire Type:</strong> {questionnaireType === 'symptoms' ? 'Symptomatic' : 'Asymptomatic Exposure'}
            </p>
            <p className="std-questionnaire-mb-2">
              <strong>Completed:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="std-questionnaire-mb-2">
              <strong>Risk Factors Identified:</strong> {accessRestrictions.length}
            </p>
            <p>
              <strong>Risk Level:</strong> {hasHighRisk ? 'High Risk - Medical Consultation Required' : 'Low to Moderate Risk'}
            </p>
          </div>
          
          <div className="std-questionnaire-restrictions-card">
            <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Access Restrictions</h2>
            {accessRestrictions.length > 0 ? (
              <div>
                {accessRestrictions.map((restriction, index) => (
                  <div key={index} className="std-questionnaire-restriction-item">
                    <AlertCircle className="std-questionnaire-restriction-icon" color="#dc2626" size={16} />
                    <span className="std-questionnaire-restriction-text">{getRestrictionMessage(restriction)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="std-questionnaire-no-restrictions">
                <CheckCircle className="std-questionnaire-no-restrictions-icon" color="#059669" size={16} />
                <span className="std-questionnaire-no-restrictions-text">No immediate restrictions identified</span>
              </div>
            )}
          </div>
        </div>
        
        {hasHighRisk && (
          <div className="std-questionnaire-urgent-action-card">
            <div className="std-questionnaire-urgent-header">
              <AlertCircle color="#dc2626" size={24} />
              <h2 className="std-questionnaire-urgent-title">Immediate Action Required</h2>
            </div>
            <p className="std-questionnaire-urgent-text std-questionnaire-mb-4">
              Based on your responses, we strongly recommend consulting with a healthcare provider before proceeding with self-testing.
            </p>
            <button
              onClick={handleDoctorConsultation}
              className="std-questionnaire-btn std-questionnaire-btn-urgent"
            >
              <Calendar size={20} className="std-questionnaire-mr-2" />
              Book Doctor Consultation
            </button>
            <p className="std-questionnaire-urgent-note">
              <strong>Note:</strong> Online ordering has been restricted due to identified health risks. Professional medical evaluation is recommended.
            </p>
          </div>
        )}
        
        <div className="std-questionnaire-next-steps-card">
          <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Next Steps</h2>
          <div className="std-questionnaire-next-steps-list">
            {hasHighRisk ? (
              <>
                <p>• <strong>Consult with a healthcare provider immediately</strong></p>
                <p>• Follow medical advice for testing and treatment</p>
                <p>• Avoid intimate contact until cleared by healthcare provider</p>
                <p>• Inform recent partners about potential exposure</p>
              </>
            ) : (
              <>
                <p>• Schedule appropriate testing based on your responses</p>
                <p>• Follow up with healthcare provider if symptoms persist or worsen</p>
                <p>• Inform recent partners if exposure risk is identified</p>
                <p>• Consider preventive measures for future sexual activity</p>
              </>
            )}
          </div>
        </div>
        
        <div className="std-questionnaire-note-card">
          <div className="std-questionnaire-flex std-questionnaire-items-center">
            <AlertCircle color="#eab308" size={20} className="std-questionnaire-mr-2" />
            <p className="std-questionnaire-alert-text">
              <strong>Note:</strong> This assessment can only be completed once. If your symptoms change or you have new exposures, please consult with a healthcare provider directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default STDQuestionnaireSystem;