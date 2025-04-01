import { useEffect, useState } from "react";
import { useRoleContext } from "../../../../Role/context/RoleContext";
import { User } from "../../../types/User";
import UserCard from "./UserCard";
import { Role } from "../../../types/Role";
import MoreInfoModalContainer from "../../moreInfoModal/MoreInfoModalContainer";
import UserFormContainer from "../../userForm/UserFormContainer";

interface UserCardContainerProps {
  user: User;
}
const UserCardContainer: React.FC<UserCardContainerProps> = ({ user }) => {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const { getRoleById, loading, roles } = useRoleContext();
  const [userRole, setUserRole] = useState<Role>({
    id: "default",
    name: "sin rol",
  });

  const handleOpenUserFormClick = () => {
    setOpenUserForm(!openUserForm);
  };

  const handleMoreInfoClick = () => {
    setOpenMoreInfo(!openMoreInfo);
  };

  const handleMenuOption = async (option: string) => {
    switch (option) {
      case "Ver mas":
        console.log("ver mas::: ");
        handleMoreInfoClick();
        break;
      case "Editar":
        console.log("Editar::: ");
        handleOpenUserFormClick();
        break;
      case "Eliminar":
        console.log("Eliminar::: ");
        break;
      default:
        console.log("Opcion invalida");
        break;
    }
  };

  useEffect(() => {
    if (!loading) {
      const role = getRoleById(user.role);
      setUserRole(role);
    }
  }, [user.role, getRoleById, loading, roles]);

  return (
    <>
      <UserCard
        user={user}
        userRole={userRole}
        roles={roles}
        handleMenuOption={handleMenuOption}
      />
      {openMoreInfo && (
        <MoreInfoModalContainer
          open={openMoreInfo}
          handleMoreInfoClick={handleMoreInfoClick}
          user={user}
          userRole={userRole}
        />
      )}
      {openUserForm && (
        <UserFormContainer
          open={openUserForm}
          handleClick={handleOpenUserFormClick}
          user={user}
        />
      )}
    </>
  );
};
export default UserCardContainer;
