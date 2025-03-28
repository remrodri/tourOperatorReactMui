import { useUserContext } from "../../../../context/UserContext";
import { User } from "../../types/User";
import UserForm from "./UserForm";

interface UserFormContainerProps {
  open: boolean;
  handleClick: () => void;
  user?: User;
}
const UserFormContainer: React.FC<UserFormContainerProps> = ({
  open,
  handleClick,
  user,
}) => {
  const { updateUser, registerUser } = useUserContext();

  const handleSubmit = async (userData: any) => {
    user?.id
      ? await updateUser(userData, user.id)
      : await registerUser(userData);
  };
  return <UserForm open={open} handleClick={handleClick} user={user} />;
};
export default UserFormContainer;
