import { Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface SellerInfoProps {
  seller: User | null;
}
const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  // console.log("seller::: ", seller);

  return (
    <Box
    sx={{
      width:300,
      height:120,
      p:2,
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>Operador(a)</Typography>
      <Typography variant="body1" gutterBottom sx={{display:'flex',justifyContent:'center'}}>
        {seller?.firstName} {seller?.lastName}
      </Typography>
    </Box>
  );
};
export default SellerInfo;
