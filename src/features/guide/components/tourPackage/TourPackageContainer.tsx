// import TourPackage from "./TourPackage";
// import { useGuideContext } from "../../context/GuideContext";
// import { useEffect, useState } from "react";
// import { useUserContext } from "../../../userManagement/context/UserContext";
// import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
// import { TokenService } from "../../../../utils/tokenService";
// import { jwtDecode } from "jwt-decode";
// import { User } from "../../../userManagement/types/User";

import { Box } from "@mui/material";
import TourPackage from "./TourPackage";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useEffect, useState } from "react";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { useUserContext } from "../../../userManagement/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../userManagement/types/UserType";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { useGuideContext } from "../../context/GuideContext";

const TourPackageContainer: React.FC = () => {
  const { getTourPackageInfoById } = useTourPackageContext();
  const [tourPackage, setTourPackage] = useState<TourPackageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { guides, getUserById } = useUserContext();
  const { getDateRangeById } = useDateRangeContext();
  const [asignedGuides, setAsignedGuides] = useState<User[]>([]);
  const { currentDateRange, currentTourPackage } = useGuideContext();

  const getTourPackage = () => {
    setLoading(true);
    // const currentTourPackageId = localStorage.getItem("currentTourPackage");
    if (!currentTourPackage) {
      return;
    }
    const tourPackage = getTourPackageInfoById(currentTourPackage);
    // console.log("tourPackage::: ", tourPackage);
    setTourPackage(tourPackage);
    setLoading(false);
  };

  const getAsignedGuides = (tourPackage: TourPackageType) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      return;
    }
    const currentUser: User = jwtDecode(userToken);
    // console.log('user::: ', user);

    const token = localStorage.getItem("currentDateRange");
    // console.log("token::: ", token);
    if (!token) {
      return;
    }
    const currentDateRange = getDateRangeById(token);
    // console.log("currentDateRange::: ", currentDateRange);
    if (!currentDateRange) {
      return;
    }
    const asignedGuides = currentDateRange.guides
      ?.map((guideId) => {
        const foundGuide = guides.find((guide) => guide.id === guideId);
        return foundGuide;
      })
      .filter((guide) => guide !== undefined && guide.id !== currentUser.id)
      .filter((guide) => guide !== undefined);
    setAsignedGuides(asignedGuides ?? []);
  };

  useEffect(() => {
    getTourPackage();
  }, []);

  useEffect(() => {
    if (tourPackage) {
      getAsignedGuides(tourPackage);
    }
  }, [tourPackage]);
  return (
    <TourPackage
      tourPackage={tourPackage}
      loading={loading}
      asignedGuides={asignedGuides}
    />
  );
};

export default TourPackageContainer;
