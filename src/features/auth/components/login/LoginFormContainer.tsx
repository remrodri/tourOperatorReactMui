import axios from "axios";
import LoginForm from "./LoginForm";
import { useLogin } from "../../hook/useLogin";
import { useState } from "react";
import { sileo } from "sileo";

const LoginFormContainer: React.FC = () => {
  const { login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (userData: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        sileo.error({
          title: "Error",
          description: error.response?.data.message || "Login fallido",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      loading={loading}
    />
  );
};

export default LoginFormContainer;
