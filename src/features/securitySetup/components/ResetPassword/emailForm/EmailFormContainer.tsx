import { useResetPassword } from "../hook/useResetPassword";
import EmailForm from "./EmailForm";

const EmailFormContainer: React.FC = () => {
  const { findUserByEmail } = useResetPassword();
  const onSubmit = async (email: string) => {
    console.log("email::: ", email);
    findUserByEmail(email);
  };

  return <EmailForm onSubmit={onSubmit} />;
};

export default EmailFormContainer;
