import axios from "axios";
import LoginForm from "./LoginForm";
import { authService } from "./service/authService";
import { useLogin } from "./hook/useLogin";

const LoginFormContainer: React.FC = () => {
  const { error, login } = useLogin();
  const onSubmit = async (userData: { email: string; password: string }) => {
    try {
      // const response = await authService.login(userData);
      await login(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      // console.log("error::: ", error);
    }
  };
  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginFormContainer;
