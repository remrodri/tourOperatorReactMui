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
import { useNewSnackbar } from "../../../context/SnackbarContext";

interface UserContextType {
  fetchGuides: () => void;
  guides: User[];
  users: User[];
  loading: boolean;
  // error: string | null;
  registerUser: (userData: Partial<User>) => Promise<any>;
  updateUser: (userData: Partial<User>, userId: string) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = TokenService.getToken();
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();
  const [guides, setGuides] = useState<User[]>([]);

  const fetchGuides = () => {
    
    try {
      if (users.length > 0) {
        const filteredUsers = users.filter(
          (user: User) => user.role === "67230105d01b26670d05388c"
        );
        setGuides(filteredUsers);
        console.log('guides::: ', guides);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
      }
      if (error instanceof Error) {
        showSnackbar("Error al obtener los guias", "error");
      }
    }
  };

  const deleteUser = async (userId: string): Promise<any> => {
    if (!token) {
      // setError("No se encontro el token");
      setLoading(false);
      return;
    }
    try {
      const response = await userService.deleteUser(userId, token);
      if (response) {
        const filteredUsers = users.filter((user: User) => user.id !== userId);
        setUsers(filteredUsers);
        return response.data;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!token) {
      // setError("No se encontro el token");
      setLoading(false);
      showSnackbar("No hay token", "error");
      return;
    }
    try {
      const response = await userService.getUsers(token);
      if (!response?.data) {
        showSnackbar("Error al cargar", "error");
        throw new Error("No se recupero la lista de usuarios");
      }
      setUsers(response.data);
    } catch (error) {
      // setError("Error al obtener los usuarios");
      console.error("Error al obtener los usuarios", error);
      showSnackbar("Error al obtener los usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData: Partial<User>): Promise<any> => {
    if (!token) {
      // setError("No se encontro el token");
      setLoading(false);
    } else {
      try {
        const response = await userService.registerUser(userData, token);
        // console.log("response::: ", response);
        if (response) {
          setUsers([...users, response.data]);
          return response.data;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          // setError("Falla al registrar el nuevo usuario");
        }
      }
    }
  };

  const updateUser = async (
    userData: Partial<User>,
    userId: string
  ): Promise<any> => {
    if (!token) {
      // setError("No se encontro el token");
      setLoading(false);
    } else {
      try {
        const response = await userService.updateUser(userData, userId, token);
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
          // setError("Falla al actualizar el usuario");
        }
      }
    }
  };

  useEffect(() => {
    // console.log("::: ");
    fetchUsers();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        guides,
        fetchGuides,
        users,
        loading,
        // error,
        registerUser,
        updateUser,
        deleteUser,
      }}
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
