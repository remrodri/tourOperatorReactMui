import SecurityAnswerForm from "./SecurityAnswerForm";
import {
  useSecurityQuestions,
  SecurityAnswersFormValues,
} from "./hook/useSecurityQuestions";

const SecurityAnswerContainer: React.FC = () => {
  const { questionsAnswers, sendSecurityAnswers, isLoading, error } =
    useSecurityQuestions();

  const onSubmit = async (values: SecurityAnswersFormValues) => {
    await sendSecurityAnswers(values);
  };

  return (
    <SecurityAnswerForm
      onSubmit={onSubmit}
      questionsAnswers={questionsAnswers}
      isSubmitting={isLoading}
      errorMessage={error}
    />
  );
};

export default SecurityAnswerContainer;
