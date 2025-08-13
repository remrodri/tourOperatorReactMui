import TourPackage from "./TourPackage";
import { useGuideContext } from "../../context/GuideContext";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../userManagement/context/UserContext";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { TokenService } from "../../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../userManagement/types/User";

const TourPackageContainer: React.FC = () => {
  const { users } = useUserContext();
  const { tourPackage, loading, pendingDateRange } = useGuideContext();

  const [AsignedGuides, setAsignedGuides] = useState<User[]>([]);

  // console.log('users::: ', users);

  const getAsignedGuides = (dt: DateRangeType) => {
    const token = TokenService.getToken();
    if (!token) {
      return;
    }
    const user: User = jwtDecode(token as string);

    const asignedGuides = pendingDateRange?.guides.map((guideId) => {
      const foundGuide = users.find((guide) => guide.id === guideId);
      return foundGuide;
    });

    const otherGuides = asignedGuides
      ?.filter((guide) => guide?.id !== user.id)
      .filter((guide) => guide !== undefined);
    setAsignedGuides(otherGuides ?? []);
  };

  useEffect(() => {
    if (pendingDateRange) {
      getAsignedGuides(pendingDateRange);
    }
  }, [pendingDateRange]);

  return (
    <TourPackage
      loading={loading}
      tourPackage={tourPackage}
      pendingDateRange={pendingDateRange}
      asignedGuides={AsignedGuides}
    />
  );
};
export default TourPackageContainer;
