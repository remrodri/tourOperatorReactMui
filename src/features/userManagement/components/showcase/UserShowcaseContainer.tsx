import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import UserShowcase from "./UserShowcase";
import UserFormContainer from "../userForm/UserFormContainer";

const UserShowcaseContainer: React.FC = () => {
  const { users } = useUserContext();
  const [open, setOpen] = useState(false);
  
  console.log('users::: ', users);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <UserShowcase handleClick={handleClick} users={users} />
      {open && <UserFormContainer open={open} handleClick={handleClick} />}
    </>
  );
};
export default UserShowcaseContainer;
