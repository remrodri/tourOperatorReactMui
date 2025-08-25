import { useState } from "react";
// import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { DateRangeType } from "../../types/DateRangeType";
import DateManager from "./DateManager";
import DateSelectorFormContainer from "./DateSelectorForm/DateSelectorFormContainer";
import { TourPackageProvider } from "../../context/TourPackageContext";
import { TourPackageType } from "../../types/TourPackageType";

interface DateManagerContainerProps {
  open: boolean;
  onClose: () => void;
  dateRangeIds: DateRangeType[];
  duration: number;
  tourPackageId: string;
  tourPackage: TourPackageType;
}

const DateManagerContainer: React.FC<DateManagerContainerProps> = ({
  open,
  onClose,
  dateRangeIds,
  duration,
  tourPackageId,
  tourPackage,
}) => {
  // const { getDateRangeInfoById } = useDateRangeContext();
  const [openDateSelectorForm, setOpenDateSelectorForm] = useState(false);

  // const [isEditing, setIsEditing] = useState(false);

  const handleOpenDateSelectorForm = () => {
    setOpenDateSelectorForm(true);
  };

  const handleCloseDateSelectorForm = () => {
    setOpenDateSelectorForm(false);
  };

  // 🔑 ya no uso useState ni useEffect
  // const dateRangesInfo = dateRangeIds
  //   .map((dr) => (dr.id ? getDateRangeInfoById(dr.id) : dr))
  //   .filter((dr): dr is DateRangeType => !!dr);

  const dateRangesInfo = tourPackage.dateRanges;

  return (
    <>
      <DateManager
        open={open}
        onClose={onClose}
        dateRanges={dateRangesInfo}
        openDateSelectorForm={openDateSelectorForm}
        handleOpenDateSelectorForm={handleOpenDateSelectorForm}
        handleCloseDateSelectorForm={handleCloseDateSelectorForm}
        duration={duration}
        dateRangesInfo={dateRangesInfo}
        tourPackageId={tourPackageId}
      />
      {/* <DateManagerFormContainer
        open={openDateRangeForm}
        onClose={handleCloseDateRangeForm}
        isEditing={isEditing}
        duration={duration}
        // dateRanges={localDateRanges}
        // handleDateChange={handleDateChange}
      /> */}
      <DateSelectorFormContainer
        open={openDateSelectorForm}
        onClose={handleCloseDateSelectorForm}
        // isEditing={isEditing}
        duration={duration}
        dateRanges={dateRangesInfo}
        tourPackageId={tourPackageId}
      />
    </>
  );
};

export default DateManagerContainer;
