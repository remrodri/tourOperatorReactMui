import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../hook/useResetPassword";
import SecurityAnswerForm from "./SecurityAnswerForm";

const SecurityAnswerFormContainer: React.FC = () => {
  const { question, getRandomQuestion, checkSecurityAnswer, isLoading, error } =
    useResetPassword();

  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      getRandomQuestion(userId);
    }
  }, [userId, getRandomQuestion]);

  const onSubmit = async (values: { answerText: string }) => {
    if (!userId || !question) return;

    await checkSecurityAnswer({
      userId,
      questionId: question.questionId,
      answerText: values.answerText,
    });
  };

  return (
    <SecurityAnswerForm
      onSubmit={onSubmit}
      questionText={question?.questionText ?? ""}
      isSubmitting={isLoading}
      errorMessage={error}
    />
  );
};

export default SecurityAnswerFormContainer;
