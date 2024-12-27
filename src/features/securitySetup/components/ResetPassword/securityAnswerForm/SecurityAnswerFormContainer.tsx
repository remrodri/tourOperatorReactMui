import { useEffect } from "react";
import { useResetPassword } from "../hook/useResetPassword";
import SecurityAnswerForm from "./SecurityAnswerForm";
import { useParams } from "react-router-dom";

const SecurityAnswerFormContainer: React.FC = () => {
  const { question, getRandomQuestion, checkSecurityAnswer } =
    useResetPassword();
  const params = useParams();
  // console.log("question::: ", question);
  useEffect(() => {
    if (!params.userId) {
      console.log("No se encuantra el id del usuario");
      return;
    }
    getRandomQuestion(params.userId);
  }, []);

  // console.log('question::: ', question);
  const onSubmit = async (answer: { answerText: string }) => {
    // console.log("answer::: ", answer);

    if (!question) {
      console.log("No se encuentra la pregunta");
      return;
    }
    const securityAnswer = {
      userId: params.userId,
      questionId: question.questionId,
      answerText: answer.answerText,
    };
    // console.log("securityAnswer::: ", securityAnswer);
    // console.log("answer::: ", answer);
    await checkSecurityAnswer(securityAnswer);
  };
  return <SecurityAnswerForm onSubmit={onSubmit} question={question} />;
};
export default SecurityAnswerFormContainer;
