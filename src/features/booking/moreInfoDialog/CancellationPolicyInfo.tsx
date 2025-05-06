import { Box, Typography } from "@mui/material";
import { CancellationPolicy } from "../../cancellationPolicy/types/CancellationPolicy";

interface CancellationPolicyProps {
  cancellationPolicy: CancellationPolicy | null;
}

const CancellationPolicyInfo: React.FC<CancellationPolicyProps> = ({
  cancellationPolicy,
}) => {
  return (
    <Box>
      <Typography variant="h5">Politica de Cancelacion</Typography>
      <Typography variant="body1">
        Nombre: {cancellationPolicy?.name || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Descripcion: {cancellationPolicy?.description || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Descuento(%): {cancellationPolicy?.refoundPercentage}
      </Typography>
      <Typography variant="body1">
        Tiempo limite(dias): {cancellationPolicy?.deadLine}
      </Typography>
    </Box>
  );
};
export default CancellationPolicyInfo;
