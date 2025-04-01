import { useEffect, useState } from "react";
import { useRoleContext } from "../../../../Role/context/RoleContext";
import { User } from "../../../types/User";
import UserCard from "./UserCard";
import { Role } from "../../../types/Role";

interface UserCardContainerProps {
  user: User;
}
const UserCardContainer: React.FC<UserCardContainerProps> = ({ user }) => {
  const { getRoleById, loading, roles } = useRoleContext();
  const [userRole, setUserRole] = useState<Role>({
    id: "default",
    name: "sin rol",
  });

  const handleMenuOption = async (option: string) => {
    switch (option) {
      case "Ver mas":
        console.log("ver mas::: ");
        break;
      case "Editar":
        console.log("Editar::: ");
        break;
      case "Eliminar":
        console.log("Eliminar::: ");
        break;
      default:
        console.log("La opcion no existe");
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
    <UserCard
      user={user}
      userRole={userRole}
      roles={roles}
      handleMenuOption={handleMenuOption}
    />
  );
};
export default UserCardContainer;
