// // import React, { useState, useEffect } from 'react';
// // import { CheckCircle, AlertCircle, User, FileText, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
// // import './StdQuestions.css';

// // const STDQuestionnaireSystem = () => {
// //   const [currentStep, setCurrentStep] = useState('selection');
// //   const [questionnaireType, setQuestionnaireType] = useState('');
// //   const [responses, setResponses] = useState({});
// //   const [accessRestrictions, setAccessRestrictions] = useState([]);
// //   const [isCompleted, setIsCompleted] = useState(false);
// //   const [completionDate, setCompletionDate] = useState(null);
// //   const [hasHighRisk, setHasHighRisk] = useState(false);

// //   // Block navigation to /order page if high risk
// //   useEffect(() => {
// //     const blockOrderNavigation = (event) => {
// //       if (hasHighRisk && window.location.pathname === '/order') {
// //         event.preventDefault();
// //         alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
// //         window.history.back();
// //       }
// //     };

// //     if (hasHighRisk) {
// //       window.addEventListener('popstate', blockOrderNavigation);

// //       // Also block direct navigation attempts
// //       const originalPushState = window.history.pushState;
// //       const originalReplaceState = window.history.replaceState;

// //       window.history.pushState = function(state, title, url) {
// //         if (url && url.includes('/order')) {
// //           alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
// //           return;
// //         }
// //         return originalPushState.apply(this, arguments);
// //       };

// //       window.history.replaceState = function(state, title, url) {
// //         if (url && url.includes('/order')) {
// //           alert('Order page is restricted due to identified health risks. Please consult with a doctor first.');
// //           return;
// //         }
// //         return originalReplaceState.apply(this, arguments);
// //       };

// //       return () => {
// //         window.removeEventListener('popstate', blockOrderNavigation);
// //         window.history.pushState = originalPushState;
// //         window.history.replaceState = originalReplaceState;
// //       };
// //     }
// //   }, [hasHighRisk]);

// //   // Questionnaire 1: With Symptoms
// //   const symptomsQuestions = [
// //     {
// //       id: 'symptoms',
// //       question: 'What symptoms are you currently experiencing?',
// //       type: 'multiselect',
// //       options: [
// //         'Burning during urination',
// //         'Genital discharge (penile/vaginal/rectal)',
// //         'Itching or irritation in genital area',
// //         'Sores, bumps, or blisters on or around genitals, anus, or mouth',
// //         'Pelvic or lower abdominal pain',
// //         'Unusual vaginal bleeding',
// //         'Pain during intercourse',
// //         'Rash on hands, feet, or other areas',
// //         'Swollen lymph nodes',
// //         'Fever or flu-like symptoms'
// //       ]
// //     },
// //     {
// //       id: 'symptom_onset',
// //       question: 'When did you first notice these symptoms?',
// //       type: 'date',
// //       placeholder: 'Enter date or approximate timeframe'
// //     },
// //     {
// //       id: 'symptom_progression',
// //       question: 'Have these symptoms gotten worse, stayed the same, or improved since they started?',
// //       type: 'radio',
// //       options: ['Gotten worse', 'Stayed the same', 'Improved']
// //     },
// //     {
// //       id: 'recent_contact',
// //       question: 'Have you had any recent sexual contact within the past 3 months?',
// //       type: 'radio',
// //       options: ['Yes', 'No']
// //     },
// //     {
// //       id: 'sexual_activities',
// //       question: 'If yes, what type(s) of sexual activity have you engaged in recently?',
// //       type: 'multiselect',
// //       conditional: 'recent_contact',
// //       conditionalValue: 'Yes',
// //       options: ['Vaginal sex', 'Oral sex', 'Anal sex', 'Other (please specify)']
// //     },
// //     {
// //       id: 'protection_used',
// //       question: 'Did you use protection (e.g., condoms or dental dams) during these encounters?',
// //       type: 'radio',
// //       conditional: 'recent_contact',
// //       conditionalValue: 'Yes',
// //       options: ['Always', 'Sometimes', 'Never']
// //     },
// //     {
// //       id: 'past_diagnosis',
// //       question: 'Have you been diagnosed with an STD/STI in the past? If yes, which one(s)?',
// //       type: 'text',
// //       placeholder: 'List any previous STD/STI diagnoses'
// //     },
// //     {
// //       id: 'partner_status',
// //       question: 'Do you know if your recent sexual partner(s) have tested positive for an STD/STI?',
// //       type: 'radio',
// //       options: ['Yes', 'No', 'Not sure']
// //     },
// //     {
// //       id: 'current_medications',
// //       question: 'Are you currently taking any medications or receiving treatment for any infections or conditions?',
// //       type: 'text',
// //       placeholder: 'List current medications or treatments'
// //     },
// //     {
// //       id: 'allergies',
// //       question: 'Do you have any known allergies to medications (especially antibiotics)?',
// //       type: 'text',
// //       placeholder: 'List any medication allergies'
// //     },
// //     {
// //       id: 'pregnancy_status',
// //       question: 'Are you currently pregnant or trying to conceive? (if applicable)',
// //       type: 'radio',
// //       options: ['Yes', 'No', 'N/A']
// //     },
// //     {
// //       id: 'additional_info',
// //       question: 'Is there anything else about your sexual health or symptoms you think we should know?',
// //       type: 'textarea',
// //       placeholder: 'Any additional information...'
// //     }
// //   ];

// //   // Questionnaire 2: Without Symptoms
// //   const exposureQuestions = [
// //     {
// //       id: 'testing_reason',
// //       question: 'What prompted you to seek STD/STI testing today?',
// //       type: 'text',
// //       placeholder: 'e.g., recent unprotected sex, new partner, partner tested positive, routine screening, etc.'
// //     },
// //     {
// //       id: 'last_encounter',
// //       question: 'When was your last sexual encounter?',
// //       type: 'date',
// //       placeholder: 'Approximate date'
// //     },
// //     {
// //       id: 'sexual_activities',
// //       question: 'What type(s) of sexual activity have you engaged in recently?',
// //       type: 'multiselect',
// //       options: ['Vaginal sex', 'Oral sex', 'Anal sex', 'Other (please specify)']
// //     },
// //     {
// //       id: 'protection_used',
// //       question: 'Did you use protection (e.g., condoms or dental dams) during these encounters?',
// //       type: 'radio',
// //       options: ['Always', 'Sometimes', 'Never']
// //     },
// //     {
// //       id: 'partner_count',
// //       question: 'How many sexual partners have you had in the past 3 months?',
// //       type: 'number',
// //       placeholder: 'Number of partners'
// //     },
// //     {
// //       id: 'partner_status',
// //       question: 'Do you know if any of your recent partners have tested positive for an STD/STI?',
// //       type: 'radio',
// //       options: ['Yes', 'No', 'Not sure']
// //     },
// //     {
// //       id: 'past_diagnosis',
// //       question: 'Have you ever tested positive for an STD/STI in the past? If yes, which one(s) and when?',
// //       type: 'text',
// //       placeholder: 'List any previous STD/STI diagnoses and dates'
// //     },
// //     {
// //       id: 'partner_testing',
// //       question: 'Do you have any current sexual partners who should also be tested?',
// //       type: 'radio',
// //       options: ['Yes', 'No', 'Not sure']
// //     },
// //     {
// //       id: 'prep_pep',
// //       question: 'Are you currently taking PrEP or PEP for HIV prevention?',
// //       type: 'radio',
// //       options: ['Yes', 'No', 'Not sure what that is']
// //     },
// //     {
// //       id: 'medical_conditions',
// //       question: 'Do you have any medical conditions or are you taking any medications that might affect treatment or testing?',
// //       type: 'text',
// //       placeholder: 'List any relevant medical conditions or medications'
// //     },
// //     {
// //       id: 'allergies',
// //       question: 'Do you have any known allergies to medications (especially antibiotics)?',
// //       type: 'text',
// //       placeholder: 'List any medication allergies'
// //     },
// //     {
// //       id: 'testing_preference',
// //       question: 'Would you prefer at-home testing, lab-based testing, or in-person follow-up if needed?',
// //       type: 'radio',
// //       options: ['At-home testing', 'Lab-based testing', 'In-person follow-up']
// //     }
// //   ];

// //   const handleResponseChange = (questionId, value) => {
// //     setResponses(prev => ({
// //       ...prev,
// //       [questionId]: value
// //     }));
// //   };

// //   const handleMultiSelectChange = (questionId, option) => {
// //     setResponses(prev => {
// //       const currentValues = prev[questionId] || [];
// //       const newValues = currentValues.includes(option)
// //         ? currentValues.filter(v => v !== option)
// //         : [...currentValues, option];
// //       return {
// //         ...prev,
// //         [questionId]: newValues
// //       };
// //     });
// //   };

// //   const shouldShowQuestion = (question) => {
// //     if (!question.conditional) return true;
// //     return responses[question.conditional] === question.conditionalValue;
// //   };

// //   const calculateRestrictions = () => {
// //     const restrictions = [];
// //     let highRisk = false;

// //     // High-risk symptoms
// //     const highRiskSymptoms = [
// //       'Sores, bumps, or blisters on or around genitals, anus, or mouth',
// //       'Genital discharge (penile/vaginal/rectal)',
// //       'Fever or flu-like symptoms'
// //     ];

// //     const urgentSymptoms = [
// //       'Burning during urination',
// //       'Pelvic or lower abdominal pain',
// //       'Unusual vaginal bleeding'
// //     ];

// //     if (questionnaireType === 'symptoms') {
// //       const selectedSymptoms = responses.symptoms || [];
// //       const hasHighRiskSymptoms = selectedSymptoms.some(symptom =>
// //         highRiskSymptoms.includes(symptom)
// //       );

// //       const hasUrgentSymptoms = selectedSymptoms.some(symptom =>
// //         urgentSymptoms.includes(symptom)
// //       );

// //       if (hasHighRiskSymptoms) {
// //         restrictions.push('URGENT_CARE_REQUIRED');
// //         restrictions.push('RESTRICTED_SOCIAL_ACTIVITIES');
// //         highRisk = true;
// //       }

// //       if (hasUrgentSymptoms) {
// //         restrictions.push('MEDICAL_CONSULTATION_RECOMMENDED');
// //         highRisk = true;
// //       }

// //       if (responses.protection_used === 'Never') {
// //         restrictions.push('ENHANCED_TESTING_REQUIRED');
// //       }

// //       if (responses.partner_status === 'Yes') {
// //         restrictions.push('PARTNER_NOTIFICATION_REQUIRED');
// //         highRisk = true;
// //       }

// //       if (responses.symptom_progression === 'Gotten worse') {
// //         restrictions.push('WORSENING_SYMPTOMS');
// //         highRisk = true;
// //       }
// //     }

// //     if (questionnaireType === 'exposure') {
// //       if (responses.protection_used === 'Never' && responses.partner_count > 1) {
// //         restrictions.push('HIGH_RISK_EXPOSURE');
// //         highRisk = true;
// //       }

// //       if (responses.partner_status === 'Yes') {
// //         restrictions.push('CONFIRMED_EXPOSURE');
// //         restrictions.push('IMMEDIATE_TESTING_REQUIRED');
// //         highRisk = true;
// //       }

// //       if (responses.partner_count > 3) {
// //         restrictions.push('MULTIPLE_PARTNER_RISK');
// //         highRisk = true;
// //       }
// //     }

// //     setAccessRestrictions(restrictions);
// //     setHasHighRisk(highRisk);
// //   };

// //   const handleSubmit = () => {
// //     calculateRestrictions();
// //     setIsCompleted(true);
// //     setCompletionDate(new Date().toISOString());
// //     setCurrentStep('results');
// //   };

// //   const handleDoctorConsultation = () => {
// //     // Navigate to doctor consultation page
// //     window.location.href = '/doctor-consultation';
// //   };

// //   const getRestrictionMessage = (restriction) => {
// //     const messages = {
// //       'URGENT_CARE_REQUIRED': 'Immediate medical attention recommended',
// //       'RESTRICTED_SOCIAL_ACTIVITIES': 'Avoid intimate contact until cleared by healthcare provider',
// //       'ENHANCED_TESTING_REQUIRED': 'Comprehensive STI panel recommended',
// //       'PARTNER_NOTIFICATION_REQUIRED': 'Recent partners should be notified and tested',
// //       'HIGH_RISK_EXPOSURE': 'High-risk exposure detected - testing recommended',
// //       'CONFIRMED_EXPOSURE': 'Confirmed exposure to STI - immediate action required',
// //       'IMMEDIATE_TESTING_REQUIRED': 'Testing should be done within 24-48 hours',
// //       'MEDICAL_CONSULTATION_RECOMMENDED': 'Medical consultation strongly recommended',
// //       'WORSENING_SYMPTOMS': 'Symptoms are worsening - seek immediate care',
// //       'MULTIPLE_PARTNER_RISK': 'Multiple partner exposure increases infection risk'
// //     };
// //     return messages[restriction] || restriction;
// //   };

// //   const renderQuestion = (question, index) => {
// //     if (!shouldShowQuestion(question)) return null;

// //     return (
// //       <div key={question.id} className="std-questionnaire-question-container">
// //         <label className="std-questionnaire-question-label">
// //           {index + 1}. {question.question}
// //         </label>

// //         {question.type === 'radio' && (
// //           <div className="std-questionnaire-options-container">
// //             {question.options.map(option => (
// //               <label key={option} className="std-questionnaire-option-label">
// //                 <input
// //                   type="radio"
// //                   name={question.id}
// //                   value={option}
// //                   checked={responses[question.id] === option}
// //                   onChange={(e) => handleResponseChange(question.id, e.target.value)}
// //                   className="std-questionnaire-input"
// //                 />
// //                 {option}
// //               </label>
// //             ))}
// //           </div>
// //         )}

// //         {question.type === 'multiselect' && (
// //           <div className="std-questionnaire-options-container">
// //             {question.options.map(option => (
// //               <label key={option} className="std-questionnaire-option-label">
// //                 <input
// //                   type="checkbox"
// //                   checked={(responses[question.id] || []).includes(option)}
// //                   onChange={() => handleMultiSelectChange(question.id, option)}
// //                   className="std-questionnaire-input"
// //                 />
// //                 {option}
// //               </label>
// //             ))}
// //           </div>
// //         )}

// //         {question.type === 'text' && (
// //           <input
// //             type="text"
// //             placeholder={question.placeholder}
// //             value={responses[question.id] || ''}
// //             onChange={(e) => handleResponseChange(question.id, e.target.value)}
// //             className="std-questionnaire-input"
// //           />
// //         )}

// //         {question.type === 'number' && (
// //           <input
// //             type="number"
// //             placeholder={question.placeholder}
// //             value={responses[question.id] || ''}
// //             onChange={(e) => handleResponseChange(question.id, e.target.value)}
// //             className="std-questionnaire-input"
// //           />
// //         )}

// //         {question.type === 'date' && (
// //           <input
// //             type="date"
// //             value={responses[question.id] || ''}
// //             onChange={(e) => handleResponseChange(question.id, e.target.value)}
// //             className="std-questionnaire-input"
// //           />
// //         )}

// //         {question.type === 'textarea' && (
// //           <textarea
// //             placeholder={question.placeholder}
// //             value={responses[question.id] || ''}
// //             onChange={(e) => handleResponseChange(question.id, e.target.value)}
// //             rows="3"
// //             className="std-questionnaire-textarea"
// //           />
// //         )}
// //       </div>
// //     );
// //   };

// //   // Check if questionnaire is already completed
// //   if (isCompleted && currentStep !== 'results') {
// //     return (
// //       <div className="std-questionnaire-container">
// //         <div className="std-questionnaire-completion-status">
// //           <CheckCircle className="std-questionnaire-results-icon" size={48} />
// //           <h1 className="std-questionnaire-title std-questionnaire-mb-4">Assessment Already Completed</h1>
// //           <div className="std-questionnaire-completion-info std-questionnaire-mb-6">
// //             <p className="std-questionnaire-mb-2">
// //               You have already completed the STD/STI health assessment.
// //             </p>
// //             <p>
// //               Completed on: {new Date(completionDate).toLocaleDateString()}
// //             </p>
// //           </div>
// //           <button
// //             onClick={() => setCurrentStep('results')}
// //             className="std-questionnaire-btn std-questionnaire-btn-primary"
// //           >
// //             View Results
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (currentStep === 'selection') {
// //     return (
// //       <div className="std-questionnaire-container">
// //         <div className="std-questionnaire-text-center std-questionnaire-mb-8">
// //           <h1 className="std-questionnaire-title std-questionnaire-mb-4">STD/STI Health Assessment</h1>
// //           <p className="std-questionnaire-subtitle std-questionnaire-mb-4">Please select the questionnaire that best describes your situation</p>
// //           <div className="std-questionnaire-alert-warning std-questionnaire-mb-6">
// //             <div className="std-questionnaire-alert-flex">
// //               <AlertCircle size={20} />
// //               <p className="std-questionnaire-alert-text std-questionnaire-alert-text-warning">
// //                 <strong>Important:</strong> This assessment can only be completed once. Please answer all questions carefully and honestly.
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="std-questionnaire-grid std-questionnaire-grid-2">
// //           <div
// //             className="std-questionnaire-selection-card symptoms"
// //             onClick={() => {
// //               setQuestionnaireType('symptoms');
// //               setCurrentStep('questionnaire');
// //             }}
// //           >
// //             <div className="std-questionnaire-card-header">
// //               <AlertCircle color="#ef4444" size={24} />
// //               <h2 className="std-questionnaire-card-title">I Have Symptoms</h2>
// //             </div>
// //             <p className="std-questionnaire-card-description std-questionnaire-mb-4">
// //               Choose this if you are currently experiencing symptoms that may be related to an STD/STI
// //             </p>
// //             <ul className="std-questionnaire-card-list">
// //               <li>• Burning during urination</li>
// //               <li>• Unusual discharge</li>
// //               <li>• Genital sores or bumps</li>
// //               <li>• Other concerning symptoms</li>
// //             </ul>
// //           </div>

// //           <div
// //             className="std-questionnaire-selection-card exposure"
// //             onClick={() => {
// //               setQuestionnaireType('exposure');
// //               setCurrentStep('questionnaire');
// //             }}
// //           >
// //             <div className="std-questionnaire-card-header">
// //               <User color="#22c55e" size={24} />
// //               <h2 className="std-questionnaire-card-title">Potential Exposure</h2>
// //             </div>
// //             <p className="std-questionnaire-card-description std-questionnaire-mb-4">
// //               Choose this if you don't have symptoms but are concerned about potential exposure
// //             </p>
// //             <ul className="std-questionnaire-card-list">
// //               <li>• Recent unprotected sexual activity</li>
// //               <li>• Partner tested positive</li>
// //               <li>• Routine screening</li>
// //               <li>• Peace of mind testing</li>
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (currentStep === 'questionnaire') {
// //     const questions = questionnaireType === 'symptoms' ? symptomsQuestions : exposureQuestions;

// //     return (
// //       <div className="std-questionnaire-container">
// //         <div className="std-questionnaire-nav-header">
// //           <button
// //             onClick={() => setCurrentStep('selection')}
// //             className="std-questionnaire-btn-back std-questionnaire-nav-back"
// //           >
// //             <ArrowLeft size={20} className="std-questionnaire-mr-2" />
// //             Back
// //           </button>
// //           <h1 className="std-questionnaire-title">
// //             {questionnaireType === 'symptoms' ? 'Symptom Assessment' : 'Exposure Risk Assessment'}
// //           </h1>
// //         </div>

// //         <div className="std-questionnaire-alert-info std-questionnaire-mb-6">
// //           <p className="std-questionnaire-alert-text std-questionnaire-alert-text-info">
// //             <FileText className="std-questionnaire-mr-2" size={16} />
// //             Please answer all relevant questions honestly. This information will help determine your risk level and appropriate next steps.
// //           </p>
// //         </div>

// //         <div>
// //           {questions.map((question, index) => renderQuestion(question, index))}

// //           <div className="std-questionnaire-mt-8 std-questionnaire-flex std-questionnaire-flex-end">
// //             <button
// //               onClick={handleSubmit}
// //               className="std-questionnaire-btn std-questionnaire-btn-primary"
// //             >
// //               Complete Assessment
// //               <ArrowRight size={20} className="std-questionnaire-ml-2" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (currentStep === 'results') {
// //     return (
// //       <div className="std-questionnaire-container">
// //         <div className="std-questionnaire-results-header">
// //           <CheckCircle className="std-questionnaire-results-icon" color="#22c55e" size={48} />
// //           <h1 className="std-questionnaire-title std-questionnaire-mb-4">Assessment Complete</h1>
// //         </div>

// //         <div className="std-questionnaire-grid std-questionnaire-grid-2">
// //           <div className="std-questionnaire-summary-card">
// //             <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Assessment Summary</h2>
// //             <p className="std-questionnaire-mb-2">
// //               <strong>Questionnaire Type:</strong> {questionnaireType === 'symptoms' ? 'Symptomatic' : 'Asymptomatic Exposure'}
// //             </p>
// //             <p className="std-questionnaire-mb-2">
// //               <strong>Completed:</strong> {new Date().toLocaleDateString()}
// //             </p>
// //             <p className="std-questionnaire-mb-2">
// //               <strong>Risk Factors Identified:</strong> {accessRestrictions.length}
// //             </p>
// //             <p>
// //               <strong>Risk Level:</strong> {hasHighRisk ? 'High Risk - Medical Consultation Required' : 'Low to Moderate Risk'}
// //             </p>
// //           </div>

// //           <div className="std-questionnaire-restrictions-card">
// //             <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Access Restrictions</h2>
// //             {accessRestrictions.length > 0 ? (
// //               <div>
// //                 {accessRestrictions.map((restriction, index) => (
// //                   <div key={index} className="std-questionnaire-restriction-item">
// //                     <AlertCircle className="std-questionnaire-restriction-icon" color="#dc2626" size={16} />
// //                     <span className="std-questionnaire-restriction-text">{getRestrictionMessage(restriction)}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="std-questionnaire-no-restrictions">
// //                 <CheckCircle className="std-questionnaire-no-restrictions-icon" color="#059669" size={16} />
// //                 <span className="std-questionnaire-no-restrictions-text">No immediate restrictions identified</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {hasHighRisk && (
// //           <div className="std-questionnaire-urgent-action-card">
// //             <div className="std-questionnaire-urgent-header">
// //               <AlertCircle color="#dc2626" size={24} />
// //               <h2 className="std-questionnaire-urgent-title">Immediate Action Required</h2>
// //             </div>
// //             <p className="std-questionnaire-urgent-text std-questionnaire-mb-4">
// //               Based on your responses, we strongly recommend consulting with a healthcare provider before proceeding with self-testing.
// //             </p>
// //             <button
// //               onClick={handleDoctorConsultation}
// //               className="std-questionnaire-btn std-questionnaire-btn-urgent"
// //             >
// //               <Calendar size={20} className="std-questionnaire-mr-2" />
// //               Book Doctor Consultation
// //             </button>
// //             <p className="std-questionnaire-urgent-note">
// //               <strong>Note:</strong> Online ordering has been restricted due to identified health risks. Professional medical evaluation is recommended.
// //             </p>
// //           </div>
// //         )}

// //         <div className="std-questionnaire-next-steps-card">
// //           <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">Next Steps</h2>
// //           <div className="std-questionnaire-next-steps-list">
// //             {hasHighRisk ? (
// //               <>
// //                 <p>• <strong>Consult with a healthcare provider immediately</strong></p>
// //                 <p>• Follow medical advice for testing and treatment</p>
// //                 <p>• Avoid intimate contact until cleared by healthcare provider</p>
// //                 <p>• Inform recent partners about potential exposure</p>
// //               </>
// //             ) : (
// //               <>
// //                 <p>• Schedule appropriate testing based on your responses</p>
// //                 <p>• Follow up with healthcare provider if symptoms persist or worsen</p>
// //                 <p>• Inform recent partners if exposure risk is identified</p>
// //                 <p>• Consider preventive measures for future sexual activity</p>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         <div className="std-questionnaire-note-card">
// //           <div className="std-questionnaire-flex std-questionnaire-items-center">
// //             <AlertCircle color="#eab308" size={20} className="std-questionnaire-mr-2" />
// //             <p className="std-questionnaire-alert-text">
// //               <strong>Note:</strong> This assessment can only be completed once. If your symptoms change or you have new exposures, please consult with a healthcare provider directly.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return null;
// // };

// export default STDQuestionnaireSystem;

// import React, { useState, useEffect } from "react";
// import {
//   CheckCircle,
//   AlertCircle,
//   User,
//   FileText,
//   ArrowRight,
//   ArrowLeft,
//   Calendar,
// } from "lucide-react";
// import { webApiInstance } from "../../AxiosInstance";

// const STDQuestionnaireSystem = () => {
//   const [currentStep, setCurrentStep] = useState("selection");
//   const [questionnaireType, setQuestionnaireType] = useState("");
//   const [responses, setResponses] = useState({});
//   const [accessRestrictions, setAccessRestrictions] = useState([]);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [completionDate, setCompletionDate] = useState(null);
//   const [hasHighRisk, setHasHighRisk] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [questionnaireIdF, setQuestionareIdF] = useState(null);

//   // Fetch questions from database
//   const fetchQuestions = async (type) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Replace with your actual API endpoint

//       const response = await webApiInstance.get(
//         `Question/by-questionnaire/${questionnaireIdF}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             // 'Authorization': `Bearer ${token}` if needed
//           },
//         }
//       );

//       console.log(response);
//       if (response.status==200) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setQuestions(data.questions || []);
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       setError("Failed to load questions. Please try again.");

//       // Fallback to default questions if API fails
//       setQuestions(getDefaultQuestions(type));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback default questions (keeping original structure as backup)
//   const getDefaultQuestions = (type) => {
//     if (type === "symptoms") {
//       setQuestionareIdF(1);
//       return [
//         {
//           id: "symptoms",
//           question: "What symptoms are you currently experiencing?",
//           type: "multiselect",
//           options: [
//             "Burning during urination",
//             "Genital discharge (penile/vaginal/rectal)",
//             "Itching or irritation in genital area",
//             "Sores, bumps, or blisters on or around genitals, anus, or mouth",
//             "Pelvic or lower abdominal pain",
//             "Unusual vaginal bleeding",
//             "Pain during intercourse",
//             "Rash on hands, feet, or other areas",
//             "Swollen lymph nodes",
//             "Fever or flu-like symptoms",
//           ],
//         },
//         {
//           id: "symptom_onset",
//           question: "When did you first notice these symptoms?",
//           type: "date",
//           placeholder: "Enter date or approximate timeframe",
//         },
//         {
//           id: "symptom_progression",
//           question:
//             "Have these symptoms gotten worse, stayed the same, or improved since they started?",
//           type: "radio",
//           options: ["Gotten worse", "Stayed the same", "Improved"],
//         },
//         {
//           id: "recent_contact",
//           question:
//             "Have you had any recent sexual contact within the past 3 months?",
//           type: "radio",
//           options: ["Yes", "No"],
//         },
//       ];
//     } else {
//       setQuestionareIdF(2);
//       return [
//         {
//           id: "testing_reason",
//           question: "What prompted you to seek STD/STI testing today?",
//           type: "text",
//           placeholder:
//             "e.g., recent unprotected sex, new partner, partner tested positive, routine screening, etc.",
//         },
//         {
//           id: "last_encounter",
//           question: "When was your last sexual encounter?",
//           type: "date",
//           placeholder: "Approximate date",
//         },
//         {
//           id: "sexual_activities",
//           question:
//             "What type(s) of sexual activity have you engaged in recently?",
//           type: "multiselect",
//           options: [
//             "Vaginal sex",
//             "Oral sex",
//             "Anal sex",
//             "Other (please specify)",
//           ],
//         },
//       ];
//     }
//   };

//   // Block navigation to /order page if high risk
//   useEffect(() => {
//     const blockOrderNavigation = (event) => {
//       if (hasHighRisk && window.location.pathname === "/order") {
//         event.preventDefault();
//         alert(
//           "Order page is restricted due to identified health risks. Please consult with a doctor first."
//         );
//         window.history.back();
//       }
//     };

//     if (hasHighRisk) {
//       window.addEventListener("popstate", blockOrderNavigation);

//       const originalPushState = window.history.pushState;
//       const originalReplaceState = window.history.replaceState;

//       window.history.pushState = function (state, title, url) {
//         if (url && url.includes("/order")) {
//           alert(
//             "Order page is restricted due to identified health risks. Please consult with a doctor first."
//           );
//           return;
//         }
//         return originalPushState.apply(this, arguments);
//       };

//       window.history.replaceState = function (state, title, url) {
//         if (url && url.includes("/order")) {
//           alert(
//             "Order page is restricted due to identified health risks. Please consult with a doctor first."
//           );
//           return;
//         }
//         return originalReplaceState.apply(this, arguments);
//       };

//       return () => {
//         window.removeEventListener("popstate", blockOrderNavigation);
//         window.history.pushState = originalPushState;
//         window.history.replaceState = originalReplaceState;
//       };
//     }
//   }, [hasHighRisk]);

//   const handleResponseChange = (questionId, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleMultiSelectChange = (questionId, option) => {
//     setResponses((prev) => {
//       const currentValues = prev[questionId] || [];
//       const newValues = currentValues.includes(option)
//         ? currentValues.filter((v) => v !== option)
//         : [...currentValues, option];
//       return {
//         ...prev,
//         [questionId]: newValues,
//       };
//     });
//   };

//   const shouldShowQuestion = (question) => {
//     if (!question.conditional) return true;
//     return responses[question.conditional] === question.conditionalValue;
//   };

//   const calculateRestrictions = () => {
//     const restrictions = [];
//     let highRisk = false;

//     // High-risk symptoms
//     const highRiskSymptoms = [
//       "Sores, bumps, or blisters on or around genitals, anus, or mouth",
//       "Genital discharge (penile/vaginal/rectal)",
//       "Fever or flu-like symptoms",
//     ];

//     const urgentSymptoms = [
//       "Burning during urination",
//       "Pelvic or lower abdominal pain",
//       "Unusual vaginal bleeding",
//     ];

//     if (questionnaireType === "symptoms") {
//       const selectedSymptoms = responses.symptoms || [];
//       const hasHighRiskSymptoms = selectedSymptoms.some((symptom) =>
//         highRiskSymptoms.includes(symptom)
//       );

//       const hasUrgentSymptoms = selectedSymptoms.some((symptom) =>
//         urgentSymptoms.includes(symptom)
//       );

//       if (hasHighRiskSymptoms) {
//         restrictions.push("URGENT_CARE_REQUIRED");
//         restrictions.push("RESTRICTED_SOCIAL_ACTIVITIES");
//         highRisk = true;
//       }

//       if (hasUrgentSymptoms) {
//         restrictions.push("MEDICAL_CONSULTATION_RECOMMENDED");
//         highRisk = true;
//       }

//       if (responses.protection_used === "Never") {
//         restrictions.push("ENHANCED_TESTING_REQUIRED");
//       }

//       if (responses.partner_status === "Yes") {
//         restrictions.push("PARTNER_NOTIFICATION_REQUIRED");
//         highRisk = true;
//       }

//       if (responses.symptom_progression === "Gotten worse") {
//         restrictions.push("WORSENING_SYMPTOMS");
//         highRisk = true;
//       }
//     }

//     if (questionnaireType === "exposure") {
//       if (
//         responses.protection_used === "Never" &&
//         responses.partner_count > 1
//       ) {
//         restrictions.push("HIGH_RISK_EXPOSURE");
//         highRisk = true;
//       }

//       if (responses.partner_status === "Yes") {
//         restrictions.push("CONFIRMED_EXPOSURE");
//         restrictions.push("IMMEDIATE_TESTING_REQUIRED");
//         highRisk = true;
//       }

//       if (responses.partner_count > 3) {
//         restrictions.push("MULTIPLE_PARTNER_RISK");
//         highRisk = true;
//       }
//     }

//     setAccessRestrictions(restrictions);
//     setHasHighRisk(highRisk);
//   };

//   const handleSubmit = async () => {
//     calculateRestrictions();

//     try {
//       // Submit responses to database
//       const response = await fetch("/api/questionnaire/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Add authentication headers if needed
//         },
//         body: JSON.stringify({
//           questionnaireType,
//           responses,
//           completedAt: new Date().toISOString(),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit questionnaire");
//       }

//       const result = await response.json();
//       console.log("Questionnaire submitted successfully:", result);
//     } catch (err) {
//       console.error("Error submitting questionnaire:", err);
//       // Continue with local completion even if submission fails
//     }

//     setIsCompleted(true);
//     setCompletionDate(new Date().toISOString());
//     setCurrentStep("results");
//   };

//   const handleDoctorConsultation = () => {
//     window.location.href = "/doctor-consultation";
//   };

//   const getRestrictionMessage = (restriction) => {
//     const messages = {
//       URGENT_CARE_REQUIRED: "Immediate medical attention recommended",
//       RESTRICTED_SOCIAL_ACTIVITIES:
//         "Avoid intimate contact until cleared by healthcare provider",
//       ENHANCED_TESTING_REQUIRED: "Comprehensive STI panel recommended",
//       PARTNER_NOTIFICATION_REQUIRED:
//         "Recent partners should be notified and tested",
//       HIGH_RISK_EXPOSURE: "High-risk exposure detected - testing recommended",
//       CONFIRMED_EXPOSURE:
//         "Confirmed exposure to STI - immediate action required",
//       IMMEDIATE_TESTING_REQUIRED: "Testing should be done within 24-48 hours",
//       MEDICAL_CONSULTATION_RECOMMENDED:
//         "Medical consultation strongly recommended",
//       WORSENING_SYMPTOMS: "Symptoms are worsening - seek immediate care",
//       MULTIPLE_PARTNER_RISK:
//         "Multiple partner exposure increases infection risk",
//     };
//     return messages[restriction] || restriction;
//   };

//   const renderQuestion = (question, index) => {
//     if (!shouldShowQuestion(question)) return null;

//     return (
//       <div
//         key={question.id}
//         className="mb-6 p-4 border border-gray-200 rounded-lg"
//       >
//         <label className="block text-sm font-medium text-gray-700 mb-3">
//           {index + 1}. {question.question}
//         </label>

//         {question.type === "radio" && (
//           <div className="space-y-2">
//             {question.options?.map((option) => (
//               <label key={option} className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name={question.id}
//                   value={option}
//                   checked={responses[question.id] === option}
//                   onChange={(e) =>
//                     handleResponseChange(question.id, e.target.value)
//                   }
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-700">{option}</span>
//               </label>
//             ))}
//           </div>
//         )}

//         {question.type === "multiselect" && (
//           <div className="space-y-2">
//             {question.options?.map((option) => (
//               <label key={option} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={(responses[question.id] || []).includes(option)}
//                   onChange={() => handleMultiSelectChange(question.id, option)}
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-700">{option}</span>
//               </label>
//             ))}
//           </div>
//         )}

//         {question.type === "text" && (
//           <input
//             type="text"
//             placeholder={question.placeholder}
//             value={responses[question.id] || ""}
//             onChange={(e) => handleResponseChange(question.id, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         )}

//         {question.type === "number" && (
//           <input
//             type="number"
//             placeholder={question.placeholder}
//             value={responses[question.id] || ""}
//             onChange={(e) => handleResponseChange(question.id, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         )}

//         {question.type === "date" && (
//           <input
//             type="date"
//             value={responses[question.id] || ""}
//             onChange={(e) => handleResponseChange(question.id, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         )}

//         {question.type === "textarea" && (
//           <textarea
//             placeholder={question.placeholder}
//             value={responses[question.id] || ""}
//             onChange={(e) => handleResponseChange(question.id, e.target.value)}
//             rows="3"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         )}
//       </div>
//     );
//   };

//   if (isCompleted && currentStep !== "results") {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="text-center">
//           <CheckCircle className="mx-auto mb-4" size={48} color="#22c55e" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Assessment Already Completed
//           </h1>
//           <div className="mb-6">
//             <p className="mb-2">
//               You have already completed the STD/STI health assessment.
//             </p>
//             <p>Completed on: {new Date(completionDate).toLocaleDateString()}</p>
//           </div>
//           <button
//             onClick={() => setCurrentStep("results")}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//           >
//             View Results
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (currentStep === "selection") {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             STD/STI Health Assessment
//           </h1>
//           <p className="text-lg text-gray-600 mb-4">
//             Please select the questionnaire that best describes your situation
//           </p>
//           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
//             <div className="flex items-center">
//               <AlertCircle size={20} className="text-yellow-600 mr-2" />
//               <p className="text-yellow-800">
//                 <strong>Important:</strong> This assessment can only be
//                 completed once. Please answer all questions carefully and
//                 honestly.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div
//             className="bg-white border-2 border-red-200 rounded-lg p-6 cursor-pointer hover:border-red-300 transition-colors"
//             onClick={() => {
//               setQuestionnaireType("symptoms");
//               fetchQuestions("symptoms");
//               setCurrentStep("questionnaire");
//             }}
//           >
//             <div className="flex items-center mb-4">
//               <AlertCircle color="#ef4444" size={24} className="mr-3" />
//               <h2 className="text-xl font-semibold text-gray-900">
//                 I Have Symptoms
//               </h2>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Choose this if you are currently experiencing symptoms that may be
//               related to an STD/STI
//             </p>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>• Burning during urination</li>
//               <li>• Unusual discharge</li>
//               <li>• Genital sores or bumps</li>
//               <li>• Other concerning symptoms</li>
//             </ul>
//           </div>

//           <div
//             className="bg-white border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:border-green-300 transition-colors"
//             onClick={() => {
//               setQuestionnaireType("exposure");
//               fetchQuestions("exposure");
//               setCurrentStep("questionnaire");
//             }}
//           >
//             <div className="flex items-center mb-4">
//               <User color="#22c55e" size={24} className="mr-3" />
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Potential Exposure
//               </h2>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Choose this if you don't have symptoms but are concerned about
//               potential exposure
//             </p>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>• Recent unprotected sexual activity</li>
//               <li>• Partner tested positive</li>
//               <li>• Routine screening</li>
//               <li>• Peace of mind testing</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (currentStep === "questionnaire") {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => setCurrentStep("selection")}
//             className="flex items-center text-blue-600 hover:text-blue-800"
//           >
//             <ArrowLeft size={20} className="mr-2" />
//             Back
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {questionnaireType === "symptoms"
//               ? "Symptom Assessment"
//               : "Exposure Risk Assessment"}
//           </h1>
//           <div></div>
//         </div>

//         <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
//           <p className="text-blue-800 flex items-center">
//             <FileText className="mr-2" size={16} />
//             Please answer all relevant questions honestly. This information will
//             help determine your risk level and appropriate next steps.
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Loading questions...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
//             <p className="text-red-800">{error}</p>
//           </div>
//         ) : (
//           <div>
//             {questions.map((question, index) =>
//               renderQuestion(question, index)
//             )}

//             <div className="mt-8 flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center"
//               >
//                 Complete Assessment
//                 <ArrowRight size={20} className="ml-2" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   if (currentStep === "results") {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="text-center mb-8">
//           <CheckCircle className="mx-auto mb-4" color="#22c55e" size={48} />
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Assessment Complete
//           </h1>
//         </div>

//         {hasHighRisk && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
//             <div className="flex items-center mb-4">
//               <AlertCircle color="#dc2626" size={24} className="mr-3" />
//               <h2 className="text-xl font-semibold text-red-800">
//                 Immediate Action Required
//               </h2>
//             </div>
//             <p className="text-red-700 mb-4">
//               Based on your responses, we strongly recommend consulting with a
//               healthcare provider before proceeding with self-testing.
//             </p>
//             <button
//               onClick={handleDoctorConsultation}
//               className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 flex items-center"
//             >
//               <Calendar size={20} className="mr-2" />
//               Book Doctor Consultation
//             </button>
//             <p className="mt-4 text-sm text-red-700">
//               <strong>Note:</strong> Online ordering has been restricted due to
//               identified health risks. Professional medical evaluation is
//               recommended.
//             </p>
//           </div>
//         )}

//         <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Next Steps
//           </h2>
//           <div className="space-y-2">
//             {hasHighRisk ? (
//               <>
//                 <p>
//                   •{" "}
//                   <strong>
//                     Consult with a healthcare provider immediately
//                   </strong>
//                 </p>
//                 <p>• Follow medical advice for testing and treatment</p>
//                 <p>
//                   • Avoid intimate contact until cleared by healthcare provider
//                 </p>
//                 <p>• Inform recent partners about potential exposure</p>
//               </>
//             ) : (
//               <>
//                 <p>• Schedule appropriate testing based on your responses</p>
//                 <p>
//                   • Follow up with healthcare provider if symptoms persist or
//                   worsen
//                 </p>
//                 <p>• Inform recent partners if exposure risk is identified</p>
//                 <p>• Consider preventive measures for future sexual activity</p>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//           <div className="flex items-center">
//             <AlertCircle color="#eab308" size={20} className="mr-2" />
//             <p className="text-yellow-800">
//               <strong>Note:</strong> This assessment can only be completed once.
//               If your symptoms change or you have new exposures, please consult
//               with a healthcare provider directly.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// export default STDQuestionnaireSystem;

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import "./StdQuestions.css";
// Add this import for API calls
import { webApiInstance } from "../../AxiosInstance";
import { useQuestionnaire } from "../../utils/QuestionareContext";
import { useLocation, useNavigate } from "react-router-dom";

const QUESTION_TYPE_MAP = {
  // Map your backend types to frontend types
  19: "multiselect",
  20: "radio",
  21: "text", // fallback for text/textarea
  22: "date",
  // Add more if needed
};

const STDQuestionnaireSystem = () => {
  const [currentStep, setCurrentStep] = useState("selection");
  const [questionnaireType, setQuestionnaireType] = useState("");
  const [responses, setResponses] = useState({});
  const [accessRestrictions, setAccessRestrictions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);
  const [hasHighRisk, setHasHighRisk] = useState(false);
  const { setQuestionnaireId, setHasSymptoms, setStdQuestionsFilled } =
    useQuestionnaire();

  // New state for API questions
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Prevent back
    window.history.pushState(null, "", location.pathname);
    const blockBack = () => {
      window.history.pushState(null, "", location.pathname);
    };
    window.addEventListener("popstate", blockBack);

    // Prevent page unload
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

  // Fetch questions from API when questionnaireType changes
  useEffect(() => {
    if (!questionnaireType) return;
    setLoading(true);
    setError(null);

    // Map type to questionnaireId (adjust as needed)
    const questionnaireId = questionnaireType === "symptoms" ? 2 : 4;
    if (questionnaireId == 2) {
      setQuestionnaireId(questionnaireId);
      setHasSymptoms(true);
    } else if (questionnaireId == 4) {
      setHasSymptoms(false);
    }

    webApiInstance
      .get(`Question/by-questionnaire/${questionnaireId}`)
      .then((res) => {
        // If API response is in .data.result
        const apiQuestions = res.data?.result || [];
        // Map API structure to frontend structure
        const mapped = apiQuestions.map((q) => ({
          id: q.id,
          question: q.questionText,
          type: QUESTION_TYPE_MAP[q.questionType] || "text",
          options: q.options?.map((o) => o.optionText) || [],
        }));
        setQuestions(mapped);
      })
      .catch(() => {
        setError("Failed to load questions. Please try again.");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [questionnaireType]);

  // Block navigation to /order page if high risk
  useEffect(() => {
    const blockOrderNavigation = (event) => {
      if (hasHighRisk && window.location.pathname === "/order") {
        event.preventDefault();
        alert(
          "Order page is restricted due to identified health risks. Please consult with a doctor first."
        );
        window.history.back();
      }
    };

    if (hasHighRisk) {
      window.addEventListener("popstate", blockOrderNavigation);

      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function (state, title, url) {
        if (url && url.includes("/order")) {
          alert(
            "Order page is restricted due to identified health risks. Please consult with a doctor first."
          );
          return;
        }
        return originalPushState.apply(this, arguments);
      };

      window.history.replaceState = function (state, title, url) {
        if (url && url.includes("/order")) {
          alert(
            "Order page is restricted due to identified health risks. Please consult with a doctor first."
          );
          return;
        }
        return originalReplaceState.apply(this, arguments);
      };

      return () => {
        window.removeEventListener("popstate", blockOrderNavigation);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [hasHighRisk]);

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

  // If you have conditional logic, you can implement it here
  const shouldShowQuestion = (question) => {
    // For now, always show all questions from API
    return true;
  };

  const calculateRestrictions = () => {
    const restrictions = [];
    let highRisk = false;

    // Example: Use question IDs or text to check for high risk
    // You may need to adjust this logic based on your API data
    const selectedSymptoms = responses[11] || []; // 11 is the id for symptoms question
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
      // Example: check for "Never" protection
      if (responses[16] === "Never") {
        restrictions.push("ENHANCED_TESTING_REQUIRED");
      }
      // Example: partner status (id 18)
      if (responses[18] === "Yes") {
        restrictions.push("PARTNER_NOTIFICATION_REQUIRED");
        highRisk = true;
      }
      // Example: symptom progression (id 13)
      if (responses[13] === "Gotten worse") {
        restrictions.push("WORSENING_SYMPTOMS");
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
    setStdQuestionsFilled(true);
    setCurrentStep("results");
  };

  const handleDoctorConsultation = () => {
    window.location.href = "/doctor-consultation";
  };

  // const getRestrictionMessage = (restriction) => {
  //   const messages = {
  //     'URGENT_CARE_REQUIRED': 'Immediate medical attention recommended',
  //     'RESTRICTED_SOCIAL_ACTIVITIES': 'Avoid intimate contact until cleared by healthcare provider',
  //     'ENHANCED_TESTING_REQUIRED': 'Comprehensive STI panel recommended',
  //     'PARTNER_NOTIFICATION_REQUIRED': 'Recent partners should be notified and tested',
  //     'HIGH_RISK_EXPOSURE': 'High-risk exposure detected - testing recommended',
  //     'CONFIRMED_EXPOSURE': 'Confirmed exposure to STI - immediate action required',
  //     'IMMEDIATE_TESTING_REQUIRED': 'Testing should be done within 24-48 hours',
  //     'MEDICAL_CONSULTATION_RECOMMENDED': 'Medical consultation strongly recommended',
  //     'WORSENING_SYMPTOMS': 'Symptoms are worsening - seek immediate care',
  //     'MULTIPLE_PARTNER_RISK': 'Multiple partner exposure increases infection risk'
  //   };
  //   return messages[restriction] || restriction;
  // };

  const renderQuestion = (question, index) => {
    if (!shouldShowQuestion(question)) return null;

    return (
      <div key={question.id} className="std-questionnaire-question-container">
        <label className="std-questionnaire-question-label">
          {index + 1}. {question.question}
        </label>

        {question.type === "radio" && (
          <div className="std-questionnaire-options-container">
            {question.options.map((option) => (
              <label key={option} className="std-questionnaire-option-label">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) =>
                    handleResponseChange(question.id, e.target.value)
                  }
                  className="std-questionnaire-input"
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {question.type === "multiselect" && (
          <div className="std-questionnaire-options-container">
            {question.options.map((option) => (
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

        {question.type === "text" && (
          <input
            type="text"
            placeholder={question.placeholder || ""}
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="std-questionnaire-input"
          />
        )}

        {question.type === "number" && (
          <input
            type="number"
            placeholder={question.placeholder || ""}
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
            placeholder={question.placeholder || ""}
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows="3"
            className="std-questionnaire-textarea"
          />
        )}
      </div>
    );
  };

  // Check if questionnaire is already completed
  if (isCompleted && currentStep !== "results") {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-completion-status">
          <CheckCircle className="std-questionnaire-results-icon" size={48} />
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">
            Assessment Already Completed
          </h1>
          <div className="std-questionnaire-completion-info std-questionnaire-mb-6">
            <p className="std-questionnaire-mb-2">
              You have already completed the STD/STI health assessment.
            </p>
            <p>Completed on: {new Date(completionDate).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setCurrentStep("results")}
            className="std-questionnaire-btn std-questionnaire-btn-primary"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === "selection") {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-text-center std-questionnaire-mb-8">
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">
            STD/STI Health Assessment
          </h1>
          <p className="std-questionnaire-subtitle std-questionnaire-mb-4">
            Please select the questionnaire that best describes your situation
          </p>
          <div className="std-questionnaire-alert-warning std-questionnaire-mb-6">
            <div className="std-questionnaire-alert-flex">
              <AlertCircle size={20} />
              <p className="std-questionnaire-alert-text std-questionnaire-alert-text-warning">
                <strong>Important:</strong> This assessment can only be
                completed once. Please answer all questions carefully and
                honestly.
              </p>
            </div>
          </div>
        </div>

        <div className="std-questionnaire-grid std-questionnaire-grid-2">
          <div
            className="std-questionnaire-selection-card symptoms"
            onClick={() => {
              setQuestionnaireType("symptoms");
              setCurrentStep("questionnaire");
            }}
          >
            <div className="std-questionnaire-card-header">
              <AlertCircle color="#ef4444" size={24} />
              <h2 className="std-questionnaire-card-title">I Have Symptoms</h2>
            </div>
            <p className="std-questionnaire-card-description std-questionnaire-mb-4">
              Choose this if you are currently experiencing symptoms that may be
              related to an STD/STI
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
              setQuestionnaireType("exposure");
              setCurrentStep("questionnaire");
            }}
          >
            <div className="std-questionnaire-card-header">
              <User color="#22c55e" size={24} />
              <h2 className="std-questionnaire-card-title">
                Potential Exposure
              </h2>
            </div>
            <p className="std-questionnaire-card-description std-questionnaire-mb-4">
              Choose this if you don't have symptoms but are concerned about
              potential exposure
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

  if (currentStep === "questionnaire") {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-nav-header">
          <button
            onClick={() => setCurrentStep("selection")}
            className="std-questionnaire-btn-back std-questionnaire-nav-back"
          >
            <ArrowLeft size={20} className="std-questionnaire-mr-2" />
            Back
          </button>
          <h1 className="std-questionnaire-title">
            {questionnaireType === "symptoms"
              ? "Symptom Assessment"
              : "Exposure Risk Assessment"}
          </h1>
        </div>

        <div className="std-questionnaire-alert-info std-questionnaire-mb-6">
          <p className="std-questionnaire-alert-text std-questionnaire-alert-text-info">
            <FileText className="std-questionnaire-mr-2" size={16} />
            Please answer all relevant questions honestly. This information will
            help determine your risk level and appropriate next steps.
          </p>
        </div>

        {loading ? (
          <div className="std-questionnaire-loading">Loading questions...</div>
        ) : error ? (
          <div className="std-questionnaire-error">{error}</div>
        ) : (
          <div>
            {questions.map((question, index) =>
              renderQuestion(question, index)
            )}

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
        )}
      </div>
    );
  }

  if (currentStep === "results") {
    return (
      <div className="std-questionnaire-container">
        <div className="std-questionnaire-results-header">
          <CheckCircle
            className="std-questionnaire-results-icon"
            color="#22c55e"
            size={48}
          />
          <h1 className="std-questionnaire-title std-questionnaire-mb-4">
            Assessment Complete
          </h1>
        </div>

        <div className="std-questionnaire-grid std-questionnaire-grid-2">
          <div className="std-questionnaire-summary-card">
            <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">
              Assessment Summary
            </h2>
            <p className="std-questionnaire-mb-2">
              <strong>Questionnaire Type:</strong>{" "}
              {questionnaireType === "symptoms"
                ? "Symptomatic"
                : "Asymptomatic Exposure"}
            </p>
            <p className="std-questionnaire-mb-2">
              <strong>Completed:</strong> {new Date().toLocaleDateString()}
            </p>
            {/* <p className="std-questionnaire-mb-2">
              <strong>Risk Factors Identified:</strong> {accessRestrictions.length}
            </p>
            <p>
              <strong>Risk Level:</strong> {hasHighRisk ? 'High Risk - Medical Consultation Required' : 'Low to Moderate Risk'}
            </p> */}
          </div>

          {/* <div className="std-questionnaire-restrictions-card">
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
          </div> */}
        </div>

        {/* {hasHighRisk && (
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
        )} */}

        <div className="std-questionnaire-next-steps-card">
          <h2 className="std-questionnaire-section-title std-questionnaire-mb-4">
            Next Steps
          </h2>
          <div className="std-questionnaire-next-steps-list">
            {hasHighRisk ? (
              <>
                <p>
                  •{" "}
                  <strong>
                    Consult with a healthcare provider immediately
                  </strong>
                </p>
                <p>• Follow medical advice for testing and treatment</p>
                <p>
                  • Avoid intimate contact until cleared by healthcare provider
                </p>
                <p>• Inform recent partners about potential exposure</p>
              </>
            ) : (
              <>
                <p>• Schedule appropriate testing based on your responses</p>
                <p>
                  • Follow up with healthcare provider if symptoms persist or
                  worsen
                </p>
                <p>• Inform recent partners if exposure risk is identified</p>
                <p>• Consider preventive measures for future sexual activity</p>
              </>
            )}
          </div>
        </div>

        <div className="std-questionnaire-note-card">
          <div className="std-questionnaire-flex std-questionnaire-items-center">
            <AlertCircle
              color="#eab308"
              size={20}
              className="std-questionnaire-mr-2"
            />
            <p className="std-questionnaire-alert-text">
              <strong>Note:</strong> This assessment can only be completed once.
              If your symptoms change or you have new exposures, please consult
              with a healthcare provider directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default STDQuestionnaireSystem;
