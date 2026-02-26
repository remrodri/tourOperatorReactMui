import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";
import axios from "axios";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../user/types/User";
import { useRoleContext } from "../../Role/context/RoleContext";
import { sileo } from "sileo";

interface LoginValues {
  email: string;
  password: string;
}

enum Roles {
  Guia = "guia de turismo",
  Admin = "administrador",
  Operador = "operador de ventas",
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { getRoleById } = useRoleContext();

  const login = async (values: LoginValues): Promise<boolean> => {
    try {
      const response = await authService.login(values);
      const token = response.data?.data?.token;

      if (!token) {
        sileo.error({ title: "Error", description: "Token no recibido" });
        return false;
      }

      TokenService.saveToken(token);
      const user: User = jwtDecode(token);

      if (user.firstLogin) {
        navigate("configuracion-de-seguridad/actualizar-contraseña");
        return true;
      }

      const roleName = getRoleById(user.role).name;
      switch (roleName) {
        case Roles.Guia:
          localStorage.removeItem("attendanceList");
          navigate("/guia-de-turismo/fechas-asignadas");
          break;
        case Roles.Admin:
        case Roles.Operador:
          navigate("/reservas");
          break;
        default:
          navigate("/");
      }
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        sileo.error({
          title: "Error",
          description: err.response?.data.message || "Login fallido",
        });
      }
      return false;
    }
  };

  return { login };
};
