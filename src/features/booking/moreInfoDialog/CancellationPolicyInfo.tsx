import { Box, Typography } from "@mui/material";
import { CancellationPolicy } from "../../cancellationPolicy/types/CancellationPolicy";

interface CancellationPolicyProps {
  cancellationPolicy: CancellationPolicy | null;
}

const CancellationPolicyInfo: React.FC<CancellationPolicyProps> = ({
  cancellationPolicy,
}) => {
  return (
    <Box
    sx={{
      width:300,
      height:350,
      p:2,
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}
    >
      <Typography variant="h5" gutterBottom>Politica de Cancelacion</Typography>
      <Typography variant="body1">
        Nombre: {cancellationPolicy?.name || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Descripcion: {cancellationPolicy?.description || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Descuento(%): {cancellationPolicy?.refoundPercentage}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tiempo limite(dias): {cancellationPolicy?.deadLine}
      </Typography>
    </Box>
  );
};
export default CancellationPolicyInfo;
