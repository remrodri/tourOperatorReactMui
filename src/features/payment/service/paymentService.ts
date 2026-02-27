import { isAxiosError } from "axios";
import { sileo } from "sileo";
import { axiosPrivate, axiosPublic } from "../../../config/axiosConfig";
import type { ApiResponse } from "../../../types/api";

// Si ya tienes un PaymentType en tu proyecto, reemplaza esto.
export interface PaymentType {
  id: string;
  amount: number;
  method?: string;
  status?: string;
  createdAt?: string;
  // agrega campos reales del backend
}

const url = "/payments";

/**
 * CREATE payment
 * Normalmente PRIVADO (porque son registros financieros)
 * Si tu backend lo permite público, cambia axiosPrivate -> axiosPublic
 */
export const createPaymentRequest = async (
  payment: FormData,
): Promise<PaymentType | null> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<PaymentType>>(
      url,
      payment,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    // Si tu backend manda un message útil, puedes usar response.data.message
    sileo.success({
      title: "Éxito",
      description: "Pago registrado correctamente",
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudo registrar el pago",
    });
    return null;
  }
};

/**
 * GET all payments
 * Normalmente PRIVADO
 * Si en tu caso es público, cambia axiosPrivate -> axiosPublic
 */
export const getAllPaymentsRequest = async (): Promise<
  PaymentType[] | null
> => {
  try {
    const response = await axiosPublic.get<ApiResponse<PaymentType[]>>(url);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) console.log(error.response?.data);
    sileo.error({
      title: "Error",
      description: "No se pudieron cargar los pagos",
    });
    return null;
  }
};
