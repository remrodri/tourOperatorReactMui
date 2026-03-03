import { useEffect, useState } from "react";
import { useRoleContext } from "../../../../Role/context/RoleContext";
import { UserType } from "../../../types/UserType";
import UserCard from "./UserCard";
import { RoleType } from "../../../types/RoleType";
import MoreInfoModalContainer from "../../moreInfoDialog/MoreInfoModalContainer";
import UserFormContainer from "../../userForm/UserFormContainer";
import { useUserContext } from "../../../context/UserContext";

interface UserCardContainerProps {
  user: UserType;
  role: string;
}
const UserCardContainer: React.FC<UserCardContainerProps> = ({
  user,
  role,
}) => {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const { getRoleById, loading, roles } = useRoleContext();
  const { enableUser, disableUser } = useUserContext();
  const [userRole, setUserRole] = useState<RoleType>({
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
      case "Habilitar":
        console.log("habilitar::: ");
        await enableUser(user.id);
        break;
      case "Deshabilitar":
        console.log("deshabilitar::: ");
        await disableUser(user.id);
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
        role={role}
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
