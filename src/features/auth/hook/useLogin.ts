import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import axios from "axios";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../userManagement/types/User";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (values: LoginValues) => {
    try {
      const response = await authService.login(values);
      TokenService.saveToken(response.toString());
      const token = TokenService.getToken();
      if (token) {
        const user: User = jwtDecode(token);
        if (user.firstLogin) {
          navigate("configuracion-de-seguridad/actualizar-contraseña");
        } else {
          navigate("home");
        }
        // const role = user.role;
        // console.log(role);
        // if (role == "6706da9c67b8fe2001484d59") {
        // }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
      if (err instanceof Error) {
        setError(err.message || "Login fallido");
      }
    }
  };

  return { login, error };
};
