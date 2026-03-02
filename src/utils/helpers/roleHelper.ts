import { jwtDecode } from "jwt-decode";
import { User } from "../../features/userManagement/types/UserType";
import { TokenService } from "../tokenService";

export const getCurrentUserRole: () => string = () => {
  const token = TokenService.getToken();
  const user: User = jwtDecode(token!);
  const role = user.role;
  return role;
};
