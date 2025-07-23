import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import axios from "axios";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../userManagement/types/User";
import { useRoleContext } from "../../Role/context/RoleContext";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();

  const login = async (values: LoginValues) => {
    try {
      const response = await authService.login(values);
      // console.log('response::: ', response);
      TokenService.saveToken(response.toString());
      const token = TokenService.getToken();
      if (token) {
        const user:User = jwtDecode(token);
        // console.log('user::: ', user);
        if (user.firstLogin) {
          navigate("configuracion-de-seguridad/actualizar-contraseña");
          return;
        } 
        else {
          // navigate("home");
          if(getRoleById(user.role).name==="guia de turismo"){
            navigate("guia-de-turismo/turistas");
            return;
          }
          if(getRoleById(user.role).name==="administrador"){
            navigate("reservas/todos");
            return;
          }
          if(getRoleById(user.role).name==="operador de ventas"){
            navigate("reservas/todos");
            return;
          }
          navigate("/");
        }
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
