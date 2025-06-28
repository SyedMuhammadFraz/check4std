import { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
  const [questionnaireId, setQuestionnaireId] = useState(null);
  const [hasSymptoms, setHasSymptoms] = useState(false);
  const [stdQuestionsFilled, setStdQuestionsFilled] = useState(false);

  return (
    <QuestionnaireContext.Provider value={{
      questionnaireId,
      hasSymptoms,
      setQuestionnaireId,
      setHasSymptoms,
      stdQuestionsFilled,
      setStdQuestionsFilled
    }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => useContext(QuestionnaireContext);
