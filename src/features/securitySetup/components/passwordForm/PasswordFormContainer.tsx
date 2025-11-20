import { useParams } from "react-router-dom";
import { useUpdatePassword } from "./hook/useUpdatePassword";
import PasswordForm from "./PasswordForm";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../user/types/User";

const PasswordFormContainer: React.FC = () => {
  const {
    updatePassword,
    error: useUpdatePasswordError,
    // updatePasswordWithoutToken,
  } = useUpdatePassword();
  // const params = useParams();
  // console.log("params::: ", params);

  // const token = localStorage.getItem("token");
  // console.log('token::: ', token);
  // const user = jwtDecode(token as string);
  // console.log('user::: ', user);
  const onSubmit = async (passwords: {
    password: string;
    confirmPassword: string;
  }) => {
    // console.log("passwords::: ", passwords);
    // try {
    //   if (!params.userId) {
    updatePassword(passwords.password);
    //   }
    //   updatePasswordWithoutToken(passwords.password, params.userId);
    // } catch (error) {
    //   console.error(useUpdatePasswordError);
    // }
  };
  return <PasswordForm onSubmit={onSubmit} />;
};
export default PasswordFormContainer;
