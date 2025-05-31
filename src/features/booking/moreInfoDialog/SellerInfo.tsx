import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface SellerInfoProps {
  seller: User | null;
}
const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  // console.log("seller::: ", seller);

  return (
    <Box
    
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>Operador(a)</Typography>
      <Typography variant="body1" gutterBottom sx={{display:'flex',justifyContent:'center'}}>
        {seller?.firstName} {seller?.lastName}
      </Typography>
    </Box>
  );
};
export default SellerInfo;
