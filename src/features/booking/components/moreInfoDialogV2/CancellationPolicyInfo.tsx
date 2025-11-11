import { Box, Typography } from "@mui/material";
import { CancellationPolicy } from "../../../cancellationPolicy/types/CancellationPolicy";

interface CancellationPolicyProps {
  cancellationPolicy: CancellationPolicy | null;
}

const CancellationPolicyInfo: React.FC<CancellationPolicyProps> = ({
  cancellationPolicy,
}) => {
  return (
    <Box sx={{ p: "0 10px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Politica de Cancelacion
      </Typography>
      <Typography variant="body1" gutterBottom>
        {cancellationPolicy?.name ?? "No disponible"}
      </Typography>
      <Typography variant="body2" lineHeight={1.3} gutterBottom>
        {cancellationPolicy?.description ?? "No disponible"}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Descuento(%): {cancellationPolicy?.refoundPercentage}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Tiempo limite(dias): {cancellationPolicy?.deadLine}
      </Typography>
    </Box>
  );
};
export default CancellationPolicyInfo;
