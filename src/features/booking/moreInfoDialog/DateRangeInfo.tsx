import { Box, Grid2, Typography } from "@mui/material";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

interface DateRangeInfoProps {
  dateRange: DateRangeType | null;
}

const DateRangeInfo: React.FC<DateRangeInfoProps> = ({ dateRange }) => {

  return (
    <Box sx={{p:1}}>
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>
        Fecha del paquete
      </Typography>
      <Box sx={{textAlign:'center'}}>
        {dateRange?.dates?.map((date, index) => (
          <Typography variant="body1" key={index} gutterBottom>
            {date}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
export default DateRangeInfo;
