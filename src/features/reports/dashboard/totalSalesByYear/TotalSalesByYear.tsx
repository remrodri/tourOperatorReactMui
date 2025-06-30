import { Box } from "@mui/material";
import AnimatedDonutChart from "./pieChart/AnimatedDonutChart";
import { Typography } from "@mui/material";

interface TotalSalesByYearProps {
    loading: boolean;
    error: string | null;
    countedBookings: any[];
    yearSelected: string;
    setYearSelected: (year: string) => void;
    touristDestinationWithBookings: any[];
    totalBookings: number;
    // setTouristDestinationWithBookings: (bookings: any[]) => void;
}

const TotalSalesByYear: React.FC<TotalSalesByYearProps> = ({
    loading,
    error,
    countedBookings,
    yearSelected,
    setYearSelected,
    touristDestinationWithBookings,
    totalBookings,
    // setTouristDestinationWithBookings
    
}) => {
    // console.log('totalBookings::: ', totalBookings);
    // console.log('countedBookings::: ', countedBookings);
    return (
        <Box sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
        <Typography variant="h6">Total Sales By Year</Typography>
        <Box sx={{position:"relative"}}>
            <div className="absolute inset-0 flex items-center justify-center z-index--10">
                <div className="text-center">
                    <p className={`text-lg text-zinc-500`}>Total</p>
                    <p className={`text-4xl transition-colors duration-300 font-bold`}>{totalBookings}</p>
                </div>
            </div>
            <AnimatedDonutChart 
            countedBookings={countedBookings}
            />
        </Box>
        </Box>
    );
};

export default TotalSalesByYear;
