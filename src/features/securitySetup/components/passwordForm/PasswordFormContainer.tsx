import { useUpdatePassword } from "./hook/useUpdatePassword";
import PasswordForm from "./PasswordForm";

const PasswordFormContainer: React.FC = () => {
  const { updatePassword, error: useUpdatePasswordError } = useUpdatePassword();
  const onSubmit = async (passwords: {
    password: string;
    confirmPassword: string;
  }) => {
    // console.log("passwords::: ", passwords);
    try {
      const response = await updatePassword(passwords.password);
    } catch (error) {
      console.error(useUpdatePasswordError);
    }
  };
  return <PasswordForm onSubmit={onSubmit} />;
};
export default PasswordFormContainer;
