import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import UserShowcase from "./UserShowcase";
import UserFormContainer from "../userForm/UserFormContainer";
import { TokenService } from "../../../../utils/tokenService";
import { User } from "../../types/UserType";
import { jwtDecode } from "jwt-decode";

const UserShowcaseContainer: React.FC = () => {
  const { users } = useUserContext();
  const [open, setOpen] = useState(false);

  const token = TokenService.getToken();
  const user: User = jwtDecode(token!);
  const role = user.role;

  // console.log('users::: ', users);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <UserShowcase handleClick={handleClick} users={users} role={role} />
      {open && <UserFormContainer open={open} handleClick={handleClick} />}
    </>
  );
};
export default UserShowcaseContainer;
