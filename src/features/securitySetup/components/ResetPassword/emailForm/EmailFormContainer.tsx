import { useResetPassword } from "../hook/useResetPassword";
import EmailForm from "./EmailForm";

const EmailFormContainer: React.FC = () => {
  const { findUserByEmail, isLoading, error } = useResetPassword();

  const onSubmit = async (values: { email: string }) => {
    await findUserByEmail(values.email);
  };

  return (
    <EmailForm
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      errorMessage={error}
    />
  );
};

export default EmailFormContainer;
