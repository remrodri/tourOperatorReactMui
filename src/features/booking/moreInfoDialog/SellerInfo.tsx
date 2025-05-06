import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface SellerInfoProps {
  seller: User | null;
}
const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  console.log("seller::: ", seller);

  return (
    <Box>
      <Typography variant="h5">Informacion de/la operador/a</Typography>
      <Typography variant="body1">
        Nombre: {seller?.firstName} {seller?.lastName}
      </Typography>
    </Box>
  );
};
export default SellerInfo;
