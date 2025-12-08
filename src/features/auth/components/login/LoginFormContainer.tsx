import axios from "axios";
import LoginForm from "./LoginForm";
import { useLogin } from "../../hook/useLogin";
import { useState } from "react";

const LoginFormContainer: React.FC = () => {
  const { error: useLoginError, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (userData: { email: string; password: string }) => {
    try {
      await login(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        console.log(useLoginError);
      }
    }
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
    />
  );
};

export default LoginFormContainer;
