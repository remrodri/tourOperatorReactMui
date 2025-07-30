import { Box } from "@mui/material";
import PackagesSoldBySeller from "./PackagesSoldBySeller";

const PackagesSoldBySellerContainer = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
            }}
        >
            <PackagesSoldBySeller/>
        </Box>
    );
};
export default PackagesSoldBySellerContainer;