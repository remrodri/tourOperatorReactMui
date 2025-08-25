
import DateSelectorForm from "./DateSelectorForm";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { User } from "../../../../userManagement/types/User";
import { DateRangeType } from "../../../types/DateRangeType";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { dateRangeSchema } from "./validation/dateRangeSchema";
import { useFormik } from "formik";
import { updateDateRangeRequest,createDateRangeRequest } from "../../../../dateRange/service/DateRangeService";
import { useDateRangeContext } from "../../../../dateRange/context/DateRangeContext";
import { useTourPackageContext } from "../../../context/TourPackageContext";


interface DateSelectorFormContainerProps {
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  duration: number;
  dateRanges: DateRangeType[];
  tourPackageId: string;
  currentDateRange?: DateRangeType;
}

export interface DateRangeFormValues {
  id?: string;
  // state: string;
  dates: string[];
  // tourPackageId: string;
  guides: string[];
}

const DateSelectorFormContainer:React.FC<DateSelectorFormContainerProps> = ({
  open,
  onClose,
  isEditing,
  duration,
  dateRanges,
  tourPackageId,
  currentDateRange,
}: DateSelectorFormContainerProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedGuides, setSelectedGuides] = useState<User[]>([]);
    // const [guides, setGuides] = useState<User[]>([]);
    const [handleOpenDateSelector, setHandleOpenDateSelector] = useState(false);
  const [handleCloseDateSelector, setHandleCloseDateSelector] = useState(false);
  // const [localDateRanges, setLocalDateRanges] = useState<DateRangeType[]>([]);
  // const [currentDateRange, setCurrentDateRange] = useState<DateRangeType | null>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  // const { createDateRange,updateDateRange}=useDateRangeContext();
  const {createDateRange,updateDateRange}=useTourPackageContext()
  
  
  const { guides,fetchGuides } = useUserContext();
  
const getBlockedDates = (dateRanges: DateRangeType[]) => {
  const allDates = dateRanges.flatMap(dr => dr.dates).filter((date): date is string => !!date);
  // return Array.from(new Set(allDates));
  const uniqueDates = Array.from(new Set(allDates));
  setBlockedDates(uniqueDates);
}

  const onSubmit = (values: DateRangeFormValues) => {
    const dateRangeToCreate: DateRangeType = {
      dates: values.dates,
      guides: values.guides,
      tourPackageId: tourPackageId,
    };
    console.log(" values:", values);
    if (isEditing) {
      updateDateRange(values);
    } else {
      createDateRange(dateRangeToCreate);
      onClose();
    }

  };


  const formik = useFormik<DateRangeFormValues>({
    initialValues: {
      id: currentDateRange?.id || "",
      // state: "pending",
      dates: currentDateRange?.dates || [],
      // tourPackageId: "",
      guides: currentDateRange?.guides || [],
    },
    validationSchema: dateRangeSchema(isEditing ?? false),
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    fetchGuides();
    getBlockedDates(dateRanges);
    // console.log("blockedDates", blockedDates);
  }, []);
    return (
        <DateSelectorForm 
        openDialog={open}
        handleCloseDialog={onClose}
        // selectedDate={selectedDate}
        // setSelectedDate={setSelectedDate}
        // selectedGuides={selectedGuides}
        // setSelectedGuides={setSelectedGuides}
        // handleAddDateRange={onSubmit}
        duration={duration}
        guides={guides}
        formik={formik}
        blockedDates={blockedDates}
        // handleOpenDateSelector={handleOpenDateSelector}
        // handleCloseDateSelector={handleCloseDateSelector}
        />
    )
}
export default DateSelectorFormContainer;