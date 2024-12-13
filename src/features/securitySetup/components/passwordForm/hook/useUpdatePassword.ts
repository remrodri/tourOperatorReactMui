import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../../userManagement/types/User";
import { showToast } from "../../../../../utils/modal/toast";

// interface PasswordValue {
//   password: string;
// }

export const useUpdatePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updatePassword = async (password: string): Promise<any> => {
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }
      const user: User = jwtDecode(token);
      const userId = user.id;

      const response = await securitySetupService.updatePassword(
        password,
        token,
        userId
      );
      console.log("response::: ", response);
      if (response.statusCode !== 200) {
        showToast("error", "No se pudo actualizar la contraseña");
        // setError(null);
        // navigate("../preguntas-de-seguridad");
      }
      showToast("success", "Contraseña actualizada");
      navigate("../preguntas-de-seguridad");
    } catch (error) {
      setError("Error al actualizar el password");
    }
  };
  return { updatePassword, error };
};
