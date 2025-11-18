import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import axios, { AxiosError } from "axios";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../user/types/User";
import { useRoleContext } from "../../Role/context/RoleContext";
import { useNewSnackbar } from "../../../context/SnackbarContext";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();
  const { showSnackbar } = useNewSnackbar();

  const login = async (values: LoginValues) => {
    try {
      const response = await authService.login(values);
      // console.log('response::: ', response);
      // if (!response) {
      //   setError("Login fallido");
      //   showSnackbar("Login fallido", "error");
      //   return;
      // }
      
      TokenService.saveToken(response.data.data.token);
      const token = TokenService.getToken();
      if (token) {
        const user: User = jwtDecode(token);
        // console.log('user::: ', user);
        if (user.firstLogin) {
          navigate("configuracion-de-seguridad/actualizar-contraseña");
          return;
        } else {
          // navigate("home");
          if (getRoleById(user.role).name === "guia de turismo") {
            localStorage.removeItem("attendanceList");
            navigate("guia-de-turismo/fechas-asignadas");
            return;
          }
          if (getRoleById(user.role).name === "administrador") {
            navigate("reservas/todos");
            return;
          }
          if (getRoleById(user.role).name === "operador de ventas") {
            navigate("reservas/todos");
            return;
          }
          navigate("/");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
        // setError(err.response?.data.message || "Login fallido");
        // showSnackbar(err.response?.data.message || "Login fallido", "error");
      }
      if (err instanceof Error) {
        setError(err.message || "Login fallido");
        showSnackbar(err.message || "Login fallido", "error");
      }
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        setError(err.response?.data.message || "Login fallido");
        showSnackbar(err.response?.data.message || "Login fallido", "error");
      }
    }
  };

  return { login, error };
};
