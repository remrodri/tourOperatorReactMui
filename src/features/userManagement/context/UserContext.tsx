import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { TokenService } from "../../../utils/tokenService";
import { userService } from "../services/userService";
import axios from "axios";

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = TokenService.getToken();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!token) {
      setError("No se encontro el token");
      setLoading(false);
      return;
    }
    try {
      const userList = (await userService.getUsers(token)).data;
      console.log('userList::: ', userList);
      setUsers(userList.data);
    } catch (error) {
      // if (axios.isAxiosError(error)) {
        // setError(error.response?.data || "error al obtener los users");
      // } else setError("Error al obtener los usuarios");
      setError("Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users, token]);

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
export const userUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado con un userProvider");
  }
  return context;
};
