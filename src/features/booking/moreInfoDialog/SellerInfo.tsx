import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface SellerInfoProps {
  seller: User | null;
}
const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  console.log("seller::: ", seller);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Informacion del vendedor</Typography>
      <Typography variant="body1" gutterBottom>
        Nombre: {seller?.firstName} {seller?.lastName}
      </Typography>
    </Box>
  );
};
export default SellerInfo;
