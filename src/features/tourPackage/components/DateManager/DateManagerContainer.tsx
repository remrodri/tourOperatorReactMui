import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { DateRangeType } from "../../types/DateRangeType";
import DateManager from "./DateManager";

interface DateManagerContainerProps {
  open: boolean;
  onClose: () => void;
  dateRangeIds: DateRangeType[];
}

const DateManagerContainer: React.FC<DateManagerContainerProps> = ({
  open,
  onClose,
  dateRangeIds,
}) => {
  const { getDateRangeInfoById } = useDateRangeContext();

  // 🔑 ya no uso useState ni useEffect
  const dateRangesInfo = dateRangeIds
    .map((dr) => (dr.id ? getDateRangeInfoById(dr.id) : dr))
    .filter((dr): dr is DateRangeType => !!dr);

  return (
    <DateManager open={open} onClose={onClose} dateRanges={dateRangesInfo} />
  );
};

export default DateManagerContainer;