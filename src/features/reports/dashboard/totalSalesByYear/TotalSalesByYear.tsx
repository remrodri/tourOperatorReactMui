import { Box } from "@mui/material";
import AnimatedDonutChart from "./pieChart/AnimatedDonutChart";
import { Typography } from "@mui/material";
import AnimatedContent from "../../../../Animations/AnimatedContent/AnimatedContent";
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
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        p: "1rem",
        background: "rgba(14, 18, 20, 0.6)",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        // backdropFilter: "blur(5px)",
        border: "1px solid rgba(14, 18, 20, 0.7)",
      }}
    >
      <Typography variant="h6">Cantidad de paquetes vendidos</Typography>
      <Box sx={{ position: "relative" }}>
        <div className="absolute inset-0 flex items-center justify-center z-index--10">
          <div className="text-center">
            <p className={`text-lg text-white`}>Total</p>
            <p className={`text-4xl transition-colors duration-300 font-bold`}>
              {totalBookings}
            </p>
          </div>
        </div>
        <AnimatedDonutChart countedBookings={countedBookings} />
      </Box>
    </Box>
  );
};

export default TotalSalesByYear;
