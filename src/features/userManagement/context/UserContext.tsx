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
import { isAxiosError } from "axios";

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  registerUser: (userData: Partial<User>) => Promise<any>;
  updateUser: (userData: Partial<User>, userId: string) => Promise<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = TokenService.getToken();
  const [users, setUsers] = useState<any>([]);
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
      console.log("userList::: ", userList);
      setUsers(userList);
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      // setError(error.response?.data || "error al obtener los users");
      // } else setError("Error al obtener los usuarios");
      setError("Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData: Partial<User>): Promise<any> => {
    console.log("userData::: ", userData);
    if (!token) {
      setError("No se encontro el token");
      setLoading(false);
      // return false;
    } else {
      try {
        const response = await userService.registerUser(userData, token);
        console.log("response::: ", response.data);
        if (response) {
          setUsers([...users, response.data]);
          return response.data;
        }
        // console.log("response::: ", response);
        // return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("Falla al registrar el nuevo usuario");
        }
        // showToast("error", "Falla al registrar el usuario");
        // return false;
      }
    }
  };

  const updateUser = async (
    userData: Partial<User>,
    userId: string
  ): Promise<any> => {
    // console.log("userData from update user::: ", userData);
    if (!token) {
      setError("No se encontro el token");
      setLoading(false);
    } else {
      try {
        const response = await userService.updateUser(userData, userId, token);
        console.log("response::: ", response);
        if (response) {
          const newUsers = users.map((user: User) => {
            return user.id === userId ? { ...user, ...userData } : user;
          });
          setUsers(newUsers);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response);
        }
        if (error instanceof Error) {
          setError("Falla al actualizar el usuario");
        }
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ users, loading, error, registerUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado con un userProvider");
  }
  return context;
};
