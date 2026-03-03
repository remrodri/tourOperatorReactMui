/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TokenService } from "../../../../../utils/tokenService";
import { securitySetupService } from "../../../service/securitySetupService";
import type { UserType } from "../../../../userManagement/types/UserType";

export const useUpdatePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updatePassword = async (password: string): Promise<void> => {
    try {
      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        return;
      }

      const user: UserType = jwtDecode(token);
      const userId = user.id;

      const result = await securitySetupService.updatePassword(
        password,
        userId,
      );

      // ❌ si es null, el service ya mostró sileo.error
      if (!result) {
        setError("No se pudo actualizar la contraseña");
        return;
      }

      // ✅ éxito: el service ya mostró sileo.success
      setError(null);
      navigate("../preguntas-de-seguridad");
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err);
      setError("Error inesperado al actualizar la contraseña");
      // el service ya mostró el error visual
    }
  };

  return {
    updatePassword,
    error,
  };
};
