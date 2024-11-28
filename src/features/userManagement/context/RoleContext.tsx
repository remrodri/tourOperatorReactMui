import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Role } from "../types/Role";
import { roleService } from "../services/roleService";

interface RoleContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roles, setRoles] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      const roleList = (await roleService.getRoles()).data;
      console.log("roleList::: ", roleList);
      setRoles(roleList);
    } catch (error) {
      setError("Error al obtener los roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider value={{ roles, loading, error }}>
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
