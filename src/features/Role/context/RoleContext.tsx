import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { RoleType } from "../../userManagement/types/RoleType";
import { roleService } from "../service/roleService";

interface RoleContextType {
  roles: RoleType[];
  loading: boolean;
  fetchRoles: () => Promise<void>;
  getRoleById: (id: string) => RoleType;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRoleContext debe ser usado dentro de RoleProvider");
  }
  return context;
};

const DEFAULT_ROLE: RoleType = {
  id: "default",
  name: "Sin Rol",
};

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRoles = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const list = await roleService.getRoles();

      // ❌ si es null, el service ya mostró sileo.error
      if (!list) {
        setRoles([]);
        return;
      }

      setRoles(list);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const getRoleById = useCallback(
    (id: string): RoleType => {
      if (!id || !roles.length) return DEFAULT_ROLE;
      return roles.find((r) => r.id === id) ?? DEFAULT_ROLE;
    },
    [roles],
  );

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        fetchRoles,
        getRoleById,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
