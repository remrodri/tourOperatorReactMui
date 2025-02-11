import { createContext, ReactNode, useContext, useState } from "react";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { createCancellationPolicyRequest } from "../service/CancellationPolicyService";
import { CancellationPolicy } from "../types/CancellationPolicy";

// interface CancellationPolicy {
//   name: string;
//   deadLine: number;
//   refoundPercentage: number;
//   description: string;
// }

interface CancellationPolicyContextType {
  cancellationPolicy: CancellationPolicy[];
  createCancellationPolicy: (data: CancellationPolicy) => void;
  // openDialog: boolean;
}

const CancellationPolicyContext = createContext<
  CancellationPolicyContextType | undefined
>(undefined);

export const CancellationPolicyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cancellationPolicy, setCancelationPolicy] = useState<
    CancellationPolicy[]
  >([]);
  const { showSnackbar } = useNewSnackbar();

  const createCancellationPolicy = async (data: CancellationPolicy) => {
    try {
      // console.log('data::: ', data);
      const response = await createCancellationPolicyRequest(data);
      if (!response) {
        showSnackbar("Error al crear politica de cancelacion", "error");
        return;
      }
      setCancelationPolicy([...cancellationPolicy, response.data]);
      showSnackbar("Creado con exito", "success");
    } catch (error) {
      showSnackbar("Error al crear politica de cancelacion", "error");
    }
  };

  return (
    <CancellationPolicyContext.Provider
      value={{
        cancellationPolicy,
        createCancellationPolicy,
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
