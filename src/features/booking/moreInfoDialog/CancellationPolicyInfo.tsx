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
      <Typography variant="body1">Politica de Cancelacion</Typography>
      <Typography variant="body1">
        Nombre: {cancellationPolicy?.name || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Descripcion: {cancellationPolicy?.description || "No disponible"}
      </Typography>
    </Box>
  );
};
export default CancellationPolicyInfo;
