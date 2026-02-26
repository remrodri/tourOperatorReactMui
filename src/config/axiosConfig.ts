import axios from "axios";
import { ENV } from "./env";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: `${ENV.API_BASE_URL}/api/v1`,
  timeout: 10000,
});

export default axiosInstance;
