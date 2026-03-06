/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { jwtDecode } from "jwt-decode";
import { TokenService } from "../../../utils/tokenService";

import { UserType } from "../types/UserType";

import {
  getUsersRequest,
  registerUserRequest,
  updateUserRequest,
  deleteUserRequest,
  disableUserRequest,
  enableUserRequest,
} from "../services/userService";

interface UserContextType {
  fetchGuides: () => void; // compat
  guides: UserType[];
  users: UserType[];
  loading: boolean;

  registerUser: (
    userData: Partial<UserType> | FormData,
  ) => Promise<UserType | null>;
  updateUser: (userData: FormData, userId: string) => Promise<UserType | null>;
  deleteUser: (userId: string) => Promise<UserType | null>;

  getUserById: (userId: string) => UserType | null;
  userFound: UserType | null; // compat
  getUsersById: (ids: string[]) => UserType[];

  userInfo: UserType | null;
  setUsers: (users: UserType[]) => void;

  operators: UserType[];
  disableUser: (userId: string) => Promise<UserType | null>;
  enableUser: (userId: string) => Promise<UserType | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const ROLES = {
  OPERATOR: "690cbf7c64756dcc541d8a1a",
  GUIDE: "690cbf7c64756dcc541d8a1b",
} as const;

type JwtPayload = Partial<UserType> & {
  exp?: number;
  iat?: number;
};

// ✅ Helper por si tu API devuelve _id en vez de id
const getId = (u: any) => u?.id ?? u?._id;

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [userFound] = useState<UserType | null>(null);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  const guides = useMemo(
    () => users.filter((u) => u.role === ROLES.GUIDE && !u.deleted),
    [users],
  );

  const operators = useMemo(
    () => users.filter((u) => u.role === ROLES.OPERATOR),
    [users],
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersList = await getUsersRequest();
      if (usersList) setUsers(usersList);
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
      setUserInfo(payload as UserType);
    } catch {
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    getUserInfo();
  }, [fetchUsers, getUserInfo]);

  const getUsersById = useCallback(
    (ids: string[]): UserType[] => {
      if (!ids?.length) return [];
      return ids
        .map((id) => users.find((u) => getId(u) === id))
        .filter((u): u is UserType => Boolean(u));
    },
    [users],
  );

  const getUserById = useCallback(
    (userId: string): UserType | null => {
      if (!users?.length) return null;
      return users.find((u) => getId(u) === userId) ?? null;
    },
    [users],
  );

  const disableUser = useCallback(async (userId: string) => {
    const user = await disableUserRequest(userId);
    if (user) {
      setUsers((prev) => prev.map((u) => (getId(u) === userId ? user : u)));
    }
    return user;
  }, []);

  const enableUser = useCallback(async (userId: string) => {
    const user = await enableUserRequest(userId);
    if (user) {
      setUsers((prev) => prev.map((u) => (getId(u) === userId ? user : u)));
    }
    return user;
  }, []);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const deleted = await deleteUserRequest(userId);
      if (deleted) {
        setUsers((prev) => prev.filter((u) => getId(u) !== userId));
      }
      return deleted;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(
    async (userData: Partial<UserType> | FormData) => {
      setLoading(true);
      try {
        const created = await registerUserRequest(userData);
        if (created) setUsers((prev) => [...prev, created]);
        return created;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateUser = useCallback(async (userData: FormData, userId: string) => {
    setLoading(true);
    try {
      const updated = await updateUserRequest(userId, userData);
      if (updated) {
        setUsers((prev) =>
          prev.map((u) => (getId(u) === userId ? updated : u)),
        );
      }
      return updated;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGuides = useCallback(() => {}, []);

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
