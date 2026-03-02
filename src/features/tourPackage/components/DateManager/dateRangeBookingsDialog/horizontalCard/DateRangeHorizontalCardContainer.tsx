import DateRangeHorizontalCard from "./DateRangeHorizontalCard";
import { useTouristContext } from "../../../../../tourist/context/TouristContext";
import { BookingType } from "../../../../../booking/types/BookingType";
// import MoreInfoDialogContainer from "../../../../../booking/components/moreInfoDialog/MoreInfoDialogContainer";
import { useState } from "react";

interface DateRangeHorizontalCardContainerProps {
  booking: BookingType;
}
const DateRangeHorizontalCardContainer: React.FC<
  DateRangeHorizontalCardContainerProps
> = ({ booking }) => {
  const { getTouristInfoById } = useTouristContext();
  const tourist = getTouristInfoById(booking.touristIds[0]);
  // console.log("tourist::: ", tourist);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const handleClickInfoModal = () => {
    setOpenInfoModal(!openInfoModal);
  };
  return (
    <>
      <DateRangeHorizontalCard
        tourist={tourist || null}
        touristCounter={booking.touristIds.length}
        handleClickInfoModal={handleClickInfoModal}
      />
      {/* {openInfoModal && (
        <MoreInfoDialogContainer
          open={openInfoModal}
          handleClose={handleClickInfoModal}
          booking={booking}
          balance={0}
        />
      )} */}
    </>
  );
};

export default DateRangeHorizontalCardContainer;
