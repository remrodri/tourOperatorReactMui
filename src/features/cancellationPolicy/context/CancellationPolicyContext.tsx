import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import {
  createCancellationPolicyRequest,
  deleteCancellationPolicyRequest,
  getAllCancelationPolicy,
  updateCancellationPolicyRequest,
} from "../service/CancellationPolicyService";
import { CancellationPolicy } from "../types/CancellationPolicy";

interface CancellationPolicyContextType {
  cancellationPolicy: CancellationPolicy[];
  createCancellationPolicy: (data: CancellationPolicy) => void;
  deleteCancellationPolicy: (id: string) => void;
  updateCancellationPolicy: (
    cancellationPolicy: CancellationPolicy,
    id: string
  ) => void;
  getCancellationPolicyById: (id: string) => string;
  getCancellationPolicyInfoById(id: string): CancellationPolicy | null;
}

const CancellationPolicyContext = createContext<
  CancellationPolicyContextType | undefined
>(undefined);

export const CancellationPolicyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cancellationPolicy, setCancellationPolicy] = useState<
    CancellationPolicy[]
  >([]);
  const { showSnackbar } = useNewSnackbar();

  const getCancellationPolicyInfoById = (
    id: string
  ): CancellationPolicy | null => {
    if (!id) {
      console.error("cancellation policy called without id");
      return null;
    }
    const cpFound = cancellationPolicy.find((cp) => cp.id === id);
    if (!cpFound) {
      showSnackbar("Politica de cancelacion no encontrado", "error");
      return null;
    }
    return cpFound;
  };

  const getCancellationPolicyById = (id: string) => {
    const cpFound = cancellationPolicy.find((cp) => cp.id === id);
    if (!cpFound) {
      return "Politica de cancellacion no encontrado";
    }
    return cpFound.name;
  };

  const updateCancellationPolicy = async (
    values: CancellationPolicy,
    id: string
  ) => {
    try {
      const response = await updateCancellationPolicyRequest(values, id);
      if (!response) {
        showSnackbar("Error al actualizar", "error");
        return;
      }
      setCancellationPolicy((prevCancellationPolicy: CancellationPolicy[]) =>
        prevCancellationPolicy.map((cp: CancellationPolicy) =>
          cp.id === id ? { ...cp, ...response.data } : cp
        )
      );
    } catch (error) {
      showSnackbar("Error al actualizar", "error");
    }
  };

  const deleteCancellationPolicy = async (id: string) => {
    try {
      const response = await deleteCancellationPolicyRequest(id);
      if (!response) {
        showSnackbar("Error al eliminar", "error");
        return;
      }
      setCancellationPolicy((prevCancellationPolicy: CancellationPolicy[]) =>
        prevCancellationPolicy.filter(
          (cp: CancellationPolicy) => cp.id !== response.data.id
        )
      );
      showSnackbar("Eliminado con exito", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const createCancellationPolicy = async (data: CancellationPolicy) => {
    try {
      const response = await createCancellationPolicyRequest(data);
      if (!response) {
        showSnackbar("Error al crear politica de cancelacion", "error");
        return;
      }
      setCancellationPolicy([...cancellationPolicy, response.data]);
      showSnackbar("Creado con exito", "success");
    } catch (error) {
      showSnackbar("Error al crear politica de cancelacion", "error");
    }
  };

  const fetchCancellationPolicy = async () => {
    try {
      const response = await getAllCancelationPolicy();
      // const filtered = response.data.filter((cp:CancellationPolicy) => cp.deleted === false);
      setCancellationPolicy(response.data);
    } catch (error) {
      showSnackbar("Error al cargar", "error");
    }
  };

  useEffect(() => {
    fetchCancellationPolicy();
    // console.log('::: ', );
  }, []);

  return (
    <CancellationPolicyContext.Provider
      value={{
        cancellationPolicy,
        createCancellationPolicy,
        deleteCancellationPolicy,
        updateCancellationPolicy,
        getCancellationPolicyById,
        getCancellationPolicyInfoById,
      }}
    >
      {children}
    </CancellationPolicyContext.Provider>
  );
};

export const useCancellationConditionContext = () => {
  const context = useContext(CancellationPolicyContext);
  if (context === undefined) {
    throw new Error(
      "useCancellationConditions must be used within a CancelltionPolicyProvider"
    );
  }
  return context;
};
