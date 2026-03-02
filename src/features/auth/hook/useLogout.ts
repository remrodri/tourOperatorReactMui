import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../utils/tokenService";
import { sileo } from "sileo";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = (redirectTo: string = "/") => {
    TokenService.removeToken();
    localStorage.clear();
    sileo.success({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    navigate(redirectTo);
  };

  return { logout };
};
