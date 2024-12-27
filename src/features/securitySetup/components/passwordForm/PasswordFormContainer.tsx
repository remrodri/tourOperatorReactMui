import { useParams } from "react-router-dom";
import { useUpdatePassword } from "./hook/useUpdatePassword";
import PasswordForm from "./PasswordForm";

const PasswordFormContainer: React.FC = () => {
  const {
    updatePassword,
    error: useUpdatePasswordError,
    updatePasswordWithoutToken,
  } = useUpdatePassword();
  const params = useParams();
  console.log("params::: ", params);

  const onSubmit = async (passwords: {
    password: string;
    confirmPassword: string;
  }) => {
    // console.log("passwords::: ", passwords);
    try {
      if (!params.userId) {
        updatePassword(passwords.password);
      }
      updatePasswordWithoutToken(passwords.password,params.userId);
    } catch (error) {
      console.error(useUpdatePasswordError);
    }
  };
  return <PasswordForm onSubmit={onSubmit} />;
};
export default PasswordFormContainer;
