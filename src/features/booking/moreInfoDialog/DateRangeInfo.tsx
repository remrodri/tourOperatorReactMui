import { Box, Typography } from "@mui/material";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

interface DateRangeInfoProps {
  dateRange: DateRangeType | null;
}

const DateRangeInfo: React.FC<DateRangeInfoProps> = ({ dateRange }) => {

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
