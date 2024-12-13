import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../utils/tokenService";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      TokenService.removeToken();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Login fallido");
      }
    }
  };
  return { logout, error };
};
