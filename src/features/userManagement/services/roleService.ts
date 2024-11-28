import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/roles";

interface Response {
  data: { statusCode: number; message: string; data: any };
}

const getRoles = async (): Promise<Response> => {
  const response = await axios.get<Response>(API_URL);
  // console.log('response::: ', response);
  return response.data;
};
export const roleService = {
  getRoles,
};
