import axios from "axios";

interface Response {
  statusCode: number;
  message: string;
  data: any;
}

export const handleError = (error: unknown): Response => {
  if (axios.isAxiosError(error)) {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message || "Error al realizar la solicitud",
      data: error.response?.data || null,
    };
  } else if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message || "Error desconocido",
      data: null,
    };
  }
  return {
    statusCode: 500,
    message: "Error interno del servidor",
    data: null,
  };
};
