import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/roles";

// interface Response {
//   data: { data: { id: string; name: string }[] };
// }

const getRoles = async () => {
  const response = await axios.get(API_URL);
  // console.log("response::: ", response);
  return response.data;
};
export const roleService = {
  getRoles,
};
