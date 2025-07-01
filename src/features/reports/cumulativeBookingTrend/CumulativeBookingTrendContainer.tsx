import { Box, Typography } from "@mui/material";
import LineChartPulse from "./LineChartPulse/LineChartPulse";
import { useDashboardContext } from "../context/DashboardContext";
const CumulativeBookingTrendContainer = () => {
    const {cumulativeBookings}=useDashboardContext()

    
    return (
        <Box sx={{
            display:"flex", 
            flexDirection:"column", 
            gap:"1rem",
            p:"1rem",
            }}>
            <Typography variant="h6">Tendencia de Reservas Acumuladas</Typography>
            <LineChartPulse cumulativeBookings={cumulativeBookings} />
        </Box>
    );
};
export default CumulativeBookingTrendContainer;
