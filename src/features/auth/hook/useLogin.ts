import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import axios from "axios";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";

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
      // console.log("response::: ", response);
      TokenService.saveToken(response.toString());
      const token = TokenService.getToken();
      if (token) {
        const user: any = jwtDecode(token);
        const role = user.role;
        // console.log("user::: ", user);
        console.log(role);
        if (role == "6706da9c67b8fe2001484d59") {
          navigate("home");
        }
      }
    } catch (err: unknown) {
      // if (err instanceof Error) {
      //   setError(err.message || "Login fallido");
      // }
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    }
  };

  return { login, error };
};
