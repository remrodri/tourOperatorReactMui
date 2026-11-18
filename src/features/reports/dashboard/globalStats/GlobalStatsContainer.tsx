import { useEffect, useState } from "react";
import GlobalStats from "./GlobalStats";
import { useUserContext } from "../../../userManagement/context/UserContext";
import { useDashboardContext } from "../../context/DashboardContext";
import { getTouristsCountRequest } from "../../../tourist/service/touristService";

const GlobalStatsContainer: React.FC = () => {
  const [touristCont, setTouristCont] = useState<number>(0);
  const { totalBookings, totalRevenue } = useDashboardContext();
  const { guides, operators } = useUserContext();

  useEffect(() => {
    let cancelled = false;

    const loadTouristsCount = async () => {
      const total = await getTouristsCountRequest();
      if (!cancelled && total !== null) setTouristCont(total);
    };

    void loadTouristsCount();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GlobalStats
      bookingsCont={totalBookings}
      revenue={totalRevenue}
      touristCont={touristCont}
      guidesCont={guides.length}
      operatorsCont={operators.length}
    />
  );
};
export default GlobalStatsContainer;
