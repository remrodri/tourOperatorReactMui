import { Box, Typography } from "@mui/material";
import { User } from "../../../userManagement/types/UserType";

interface SellerInfoProps {
  seller: User | null;
}
const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  // console.log("seller::: ", seller);

  return (
    <Box sx={{ p: "0 10px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Operador(a)
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {seller?.firstName} {seller?.lastName}
      </Typography>
    </Box>
  );
};
export default SellerInfo;
