import TotalSalesByYear from "./TotalSalesByYear";
// import {useState } from "react";
// import dayjs from "dayjs";
// import { BookingType } from "../../../booking/types/BookingType";
// import { useDashboardContext } from "../../context/DashboardContext";

const TotalSalesByYearContainer: React.FC = () => {
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    // const [countedBookings, setCountedBookings] = useState<any>([]);
    // const [yearSelected, setYearSelected] = useState<string>(new Date().getFullYear().toString());
    // const {touristDestinationWithBookings,totalBookings}=useDashboardContext();
    
    return (
        <TotalSalesByYear 
        // loading={loading}
        // error={error}
        // countedBookings={countedBookings}
        // yearSelected={yearSelected}
        // setYearSelected={setYearSelected}
        // touristDestinationWithBookings={touristDestinationWithBookings}
        // setTouristDestinationWithBookings={setTouristDestinationWithBookings}
        // totalBookings={totalBookings}
        />
    );
};

export default TotalSalesByYearContainer;