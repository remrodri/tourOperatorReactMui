import { useEffect, useState } from "react";
import { useBookingContext } from "../../../booking/context/BookingContext";
import GlobalStats from "./GlobalStats";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useUserContext } from "../../../userManagement/context/UserContext";

const GlobalStatsContainer: React.FC<{}> = () => {
  const [bookingsCont, setBookingsCont] = useState<number>(0);
  const [touristCont, setTouristCont] = useState<number>(0);
  const [guidesCont, setGuidesCont] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const { bookings } = useBookingContext();
  const { tourists } = useTouristContext();
  const { guides, operators } = useUserContext();
  console.log('operators::: ', operators);

  const getRevenue = () => {
    const totalRevenue = bookings.reduce((acc, booking) => {
      return acc + booking.totalPrice;
    }, 0);
    setRevenue(totalRevenue);
  };
  // console.log('bookings::: ', bookings);
  useEffect(() => {
    setBookingsCont(bookings.length);
    getRevenue();
    setTouristCont(tourists.length);
    setGuidesCont(guides.length);
  }, [bookings]);
  return (
    <GlobalStats
      bookingsCont={bookingsCont}
      revenue={revenue}
      touristCont={touristCont}
      guidesCont={guidesCont}
      operatorsCont={operators.length}
    />
  );
};
export default GlobalStatsContainer;
