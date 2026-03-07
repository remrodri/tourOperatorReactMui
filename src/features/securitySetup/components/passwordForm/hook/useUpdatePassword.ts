import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import type { UserType } from "../../../../userManagement/types/UserType";

export const useUpdatePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Si hay token: actualiza con auth (axiosPrivate)
   * Si NO hay token: actualiza sin auth (axiosPublic) usando userId recibido
   */
  const updatePassword = useCallback(
    async (password: string, userIdFromRoute?: string): Promise<void> => {
      setIsLoading(true);
      try {
        const token = TokenService.getToken();

        // ✅ CASO 1: Con token (usuario logueado)
        if (token) {
          const user: UserType = jwtDecode(token);
          const ok = await securitySetupService.updatePassword(
            password,
            user.id,
          );

          if (!ok) {
            setError("No se pudo actualizar la contraseña");
            return;
          }

          setError(null);
          navigate("../preguntas-de-seguridad");
          return;
        }

        // ✅ CASO 2: Sin token (reset password)
        if (!userIdFromRoute) {
          setError("Falta el id del usuario para restablecer la contraseña");
          return;
        }

        const ok = await securitySetupService.updatePasswordWithoutToken(
          password,
          userIdFromRoute,
        );

        if (!ok) {
          setError("No se pudo restablecer la contraseña");
          return;
        }

        setError(null);
        // luego del reset normalmente vuelves al login
        navigate("/");
      } catch (err) {
        console.error("Error actualizando contraseña:", err);
        setError("Error inesperado al actualizar la contraseña");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  return { updatePassword, isLoading, error };
};
