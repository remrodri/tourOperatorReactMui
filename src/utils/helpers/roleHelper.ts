import { jwtDecode } from "jwt-decode";
import { UserType } from "../../features/userManagement/types/UserType";
import { TokenService } from "../tokenService";

export const getCurrentUserRole: () => string = () => {
  const token = TokenService.getToken();
  const user: UserType = jwtDecode(token!);
  const role = user.role;
  return role;
};
