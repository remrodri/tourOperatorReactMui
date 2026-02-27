import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { UserType } from "../types/UserType"; // <- usa el tipo real que mostraste
import { userService } from "../services/userService";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../../../utils/tokenService";
import { sileo } from "sileo";

interface UserContextType {
  fetchGuides: () => void; // compat con tu API actual
  guides: UserType[];
  users: UserType[];
  loading: boolean;
  registerUser: (
    userData: Partial<UserType> | FormData,
  ) => Promise<UserType | null>;
  updateUser: (userData: FormData, userId: string) => Promise<UserType | null>;
  deleteUser: (userId: string) => Promise<UserType | null>;
  getUserById: (userId: string) => UserType | null;
  userFound: UserType | null; // compat (si no lo usas, luego lo puedes eliminar)
  getUsersById: (ids: string[]) => UserType[];
  userInfo: UserType | null;
  setUsers: (users: UserType[]) => void;
  operators: UserType[];
  disableUser: (userId: string) => Promise<UserType | null>;
  enableUser: (userId: string) => Promise<UserType | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Unifica aquí los IDs reales de roles (corrige tu bug anterior)
const ROLES = {
  OPERATOR: "690cbf7c64756dcc541d8a1a",
  GUIDE: "690cbf7c64756dcc541d8a1b",
} as const;

// Si tu JWT no es exactamente UserType, tipa el payload real y mapea.
// Por ahora lo dejo parcial para evitar mentiras de tipo.
type JwtPayload = Partial<UserType> & {
  exp?: number;
  iat?: number;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // compat
  const [userFound] = useState<UserType | null>(null);

  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  // ✅ Derivados sin estado duplicado (no necesitas setGuides/setOperators)
  const guides = useMemo(
    () => users.filter((u) => u.role === ROLES.GUIDE),
    [users],
  );

  const operators = useMemo(
    () => users.filter((u) => u.role === ROLES.OPERATOR),
    [users],
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersList = await userService.getUsers();
      setUsers(usersList);
    } catch (error) {
      if (isAxiosError(error)) console.log(error.response);
      sileo.error({
        title: "Error",
        description: "No se pudo cargar usuarios",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserInfo = useCallback(() => {
    const token = TokenService.getToken();
    if (!token) {
      setUserInfo(null);
      return;
    }
    try {
      const payload = jwtDecode<JwtPayload>(token);

      // ⚠️ Si tu JWT NO trae todos los campos de UserType, esto puede quedar incompleto.
      // Ideal: usar un tipo AuthUser separado o mapear campos reales del payload.
      setUserInfo(payload as UserType);
    } catch {
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    getUserInfo();
  }, [fetchUsers, getUserInfo]);

  // ✅ Selectores puros (sin toast aquí)
  const getUsersById = useCallback(
    (ids: string[]): UserType[] => {
      if (!ids || ids.length === 0) return [];
      return ids
        .map((id) => users.find((u) => u.id === id))
        .filter((u): u is UserType => u !== undefined);
    },
    [users],
  );

  const getUserById = useCallback(
    (userId: string): UserType | null => {
      if (!users || users.length === 0) return null;
      return users.find((u) => u.id === userId) ?? null;
    },
    [users],
  );

  // ✅ Acciones (ya no pasan token, el interceptor lo hace)
  const disableUser = useCallback(
    async (userId: string): Promise<UserType | null> => {
      try {
        const user = await userService.disableUser(userId);
        sileo.success({
          title: "Éxito",
          description: "Usuario deshabilitado correctamente",
        });
        setUsers((prev) => prev.map((u) => (u.id === userId ? user : u)));
        return user;
      } catch (error) {
        if (isAxiosError(error)) console.log(error.response);
        sileo.error({
          title: "Error",
          description: "No se pudo deshabilitar el usuario",
        });
        return null;
      }
    },
    [],
  );

  const enableUser = useCallback(
    async (userId: string): Promise<UserType | null> => {
      try {
        const user = await userService.enableUser(userId);
        sileo.success({
          title: "Éxito",
          description: "Usuario habilitado correctamente",
        });
        setUsers((prev) => prev.map((u) => (u.id === userId ? user : u)));
        return user;
      } catch (error) {
        if (isAxiosError(error)) console.log(error.response);
        sileo.error({
          title: "Error",
          description: "No se pudo habilitar el usuario",
        });
        return null;
      }
    },
    [],
  );

  const deleteUser = useCallback(
    async (userId: string): Promise<UserType | null> => {
      setLoading(true);
      try {
        const deletedUser = await userService.deleteUser(userId);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        sileo.success({
          title: "Éxito",
          description: "Usuario eliminado correctamente",
        });
        return deletedUser;
      } catch (error) {
        if (isAxiosError(error)) console.log(error.response);
        sileo.error({
          title: "Error",
          description: "No se pudo eliminar el usuario",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const registerUser = useCallback(
    async (
      userData: Partial<UserType> | FormData,
    ): Promise<UserType | null> => {
      setLoading(true);
      try {
        const newUser = await userService.registerUser(userData);
        setUsers((prev) => [...prev, newUser]);
        sileo.success({
          title: "Éxito",
          description: "Usuario registrado correctamente",
        });
        return newUser;
      } catch (error) {
        if (isAxiosError(error)) console.log(error.response);
        sileo.error({
          title: "Error",
          description: "No se pudo registrar usuario",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateUser = useCallback(
    async (userData: FormData, userId: string): Promise<UserType | null> => {
      setLoading(true);
      try {
        const updatedUser = await userService.updateUser(userData, userId);
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? updatedUser : u)),
        );
        sileo.success({
          title: "Éxito",
          description: "Usuario actualizado correctamente",
        });
        return updatedUser;
      } catch (error) {
        if (isAxiosError(error)) console.log(error.response);
        sileo.error({
          title: "Error",
          description: "No se pudo actualizar usuario",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // ✅ Mantengo el método por compatibilidad (ya no hace falta)
  const fetchGuides = useCallback(() => {
    // no-op: guides se calcula con useMemo desde users
  }, []);

  return (
    <UserContext.Provider
      value={{
        guides,
        fetchGuides,
        users,
        loading,
        registerUser,
        updateUser,
        deleteUser,
        getUserById,
        userFound,
        getUsersById,
        userInfo,
        setUsers,
        operators,
        disableUser,
        enableUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado con un UserProvider");
  }
  return context;
};
