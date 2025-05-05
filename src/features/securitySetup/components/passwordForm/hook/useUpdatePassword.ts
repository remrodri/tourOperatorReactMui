import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../../userManagement/types/User";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
// import { showToast } from "../../../../../utils/modal/toast";

// interface PasswordValue {
//   password: string;
// }

export const useUpdatePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { showSnackbar } = useNewSnackbar();

  // const updatePasswordWithoutToken = async (
  //   password: string,
  //   userId: any
  // ): Promise<any> => {
  //   // console.log('userId::: ', userId);
  //   // console.log('password:::>>>>>> ', password);
  //   const response = await securitySetupService.updatePasswordWithoutToken(
  //     password,
  //     userId
  //   );
  //   console.log("response::: ", response);
  //   if (response.statusCode !== 200) {
  //     showToast("error", response.message);
  //     return;
  //   }
  //   navigate("/");
  // };

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
        // showToast("error", "No se pudo actualizar la contraseña");
        showSnackbar("No se actualizo la contrasenia", "error");
        return;
        // setError(null);
        // navigate("../preguntas-de-seguridad");
      }
      // showToast("success", "Contraseña actualizada");
      showSnackbar("Contraseña actualizada", "success");
      navigate("../preguntas-de-seguridad");
    } catch (error) {
      setError("Error al actualizar el password");
    }
  };
  return {
    updatePassword,
    error,
    // updatePasswordWithoutToken
  };
};
