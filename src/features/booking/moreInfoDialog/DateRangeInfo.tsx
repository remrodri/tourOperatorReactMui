import { Box, Typography } from "@mui/material";
import { BookingType } from "../types/BookingType";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

interface DateRangeInfoProps {
  dateRange: DateRangeType | null;
}

const DateRangeInfo: React.FC<DateRangeInfoProps> = ({ dateRange }) => {
  // console.log("dateRange::: ", dateRange);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Fecha del paquete
      </Typography>
      <Box>
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
