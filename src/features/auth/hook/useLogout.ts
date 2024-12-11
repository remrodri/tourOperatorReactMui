import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import { TokenService } from "../../../utils/tokenService";
import { isAxiosError } from "axios";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // await authService.logout();
      TokenService.removeToken();
      navigate("/");
    } catch (error: unknown) {
      // if (isAxiosError(error)) {
      //   setError(error.response?.data || "Login fallido");
      // }
      if (error instanceof Error) {
        setError(error.message || "Login fallido");
      }
    }
  };
  return { logout, error };
};
