import axios from "axios";
import { ENV } from "./env";
import { TokenService } from "../utils/tokenService"; // ajusta el path según tu estructura

const baseURL = `${ENV.API_BASE_URL}/api/v1`;

export const axiosPublic = axios.create({
  baseURL,
  timeout: 10000,
});

export const axiosPrivate = axios.create({
  baseURL,
  timeout: 10000,
});

// ✅ Interceptor: agrega token SOLO si existe
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// (Opcional) Interceptor 401 para endpoints privados
// Úsalo SOLO si vas a manejar expiración/redirect aquí.
// axiosPrivate.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       TokenService.clearToken?.(); // si existe
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
