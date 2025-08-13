import { Box, Typography } from "@mui/material";
import { CancellationPolicy } from "../../../cancellationPolicy/types/CancellationPolicy";

interface CancellationPolicyProps {
  cancellationPolicy: CancellationPolicy | null;
}

const CancellationPolicyInfo: React.FC<CancellationPolicyProps> = ({
  cancellationPolicy,
}) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Politica de Cancelacion
      </Typography>
      <Typography variant="body1" gutterBottom>
        {cancellationPolicy?.name ?? "No disponible"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {cancellationPolicy?.description ?? "No disponible"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Descuento(%): {cancellationPolicy?.refoundPercentage}
      </Typography>
      <Typography variant="body1">
        Tiempo limite(dias): {cancellationPolicy?.deadLine}
      </Typography>
    </Box>
  );
};
export default CancellationPolicyInfo;
