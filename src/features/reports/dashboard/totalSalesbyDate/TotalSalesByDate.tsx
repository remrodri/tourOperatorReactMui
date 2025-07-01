import { Box, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import BarChartMultiVertical from "./multiVerticalBarChart/BarChartMultiVertical";
interface TotalSalesByDateProps {
    handleChange: (event: SelectChangeEvent) => void;
    yearsToSelect: number[];
    year: string;
    countedBookings: any[];
    loading: boolean;
    error: string | null;
    mountsByMonth: any[];
}
const TotalSalesByDate: React.FC<TotalSalesByDateProps> = ({
    handleChange,
    yearsToSelect,
    year,
    countedBookings,
    loading,
    error,
    mountsByMonth
}) => {
    return (
        <Box
        sx={{
          background: "rgba(0, 0, 0, 0.41)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
          // backdropFilter: "blur(5px)",
          border: "1px solid rgba(0, 0, 0, 0.51)",
          p:"1rem 1rem 0.5rem 1rem",
          display:"flex",
          gap:"1rem",
          flexDirection:"column",
        }}
        >
          <Box
          sx={{
            display:"flex",
            // justifyContent:"space-between",
            alignItems:"center",
            gap:"1rem",
          }}
          >
            <Typography variant="h6">Cantidad de paquetes vendidos por año</Typography>
            <FormControl size="small" sx={{width:"6rem"}}>
              <InputLabel id="demo-simple-select-label">Año</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Año"
                onChange={handleChange}
              >
                {yearsToSelect.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              
            <BarChartMultiVertical 
            key={year + "-" + JSON.stringify(countedBookings)}
            year={year}
            countedBookings={countedBookings}
            mountsByMonth={mountsByMonth}
            />
            </Box>
          
        </Box>
    );
};
export default TotalSalesByDate;
