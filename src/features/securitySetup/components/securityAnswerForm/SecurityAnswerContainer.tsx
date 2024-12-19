import { useEffect, useState } from "react";
import SecurityAnswerForm from "./SecurityAnswerForm";
import { useSecurityQuestions } from "../passwordForm/hook/useSecurityQuestions";

const SecurityAnswerContainer: React.FC = () => {
  const { questionsAnswers, sendSecurityAnswers } = useSecurityQuestions();
  // console.log("questionsAnswers::: ", questionsAnswers);

  const onSubmit = async (answerValues: any) => {
    // console.log("answerValues::: ", answerValues);
    sendSecurityAnswers(answerValues);
  };

  return (
    <SecurityAnswerForm
      onSubmit={onSubmit}
      questionsAnswers={questionsAnswers}
    />
  );
};
export default SecurityAnswerContainer;
