import { Box, Typography } from "@mui/material";
import { BarChartBenchmark } from "./benchmarkChart/BarChartBenchmark";

const PackagesSoldBySeller = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p:"1rem",
            }}
        >
          <Typography variant="h6">Paquetes vendidos por vendedor</Typography>
            <BarChartBenchmark/>
        </Box>
    );
};
export default PackagesSoldBySeller;
