import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Role } from "../../userManagement/types/Role";
import { roleService } from "../service/roleService";
import { useNewSnackbar } from "../../../context/SnackbarContext";

interface RoleContextType {
  roles: Role[];
  loading: boolean;
  // error: string | null;
  getRoleById: (id: string) => Role;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const { showSnackbar } = useNewSnackbar();
  const DEFAULT_ROLE: Role = {
    id: "default",
    name: "Sin Rol",
  };

  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const getRoleById = (id: string) => {
    // console.log('id::: ', id);
    if (!roles || roles.length === 0) {
      return DEFAULT_ROLE;
    }

    const role = roles.find((role) => role.id === id);
    if (!role) {
      return DEFAULT_ROLE;
    }
    return role;
  };

  const fetchRoles = async () => {
    try {
      const response = await roleService.getRoles();
      // console.log("roleList::: ", response);
      if (!response) {
        showSnackbar("Error al cargar los roles", "error");
      }
      setRoles(response.data);
    } catch (error) {
      console.error("Error al obtener los roles", error);
      // setError("Error al obtener los roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    // console.log('::: ', );
  }, []);

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        // error
        getRoleById,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRoleContext debe ser usado con un roleProvider");
  }
  return context;
};
