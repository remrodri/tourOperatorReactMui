import { useEffect } from "react";
import { getCurrentUserRole } from "../../../../utils/helpers/roleHelper";
import { useTouristContext } from "../../context/TouristContext";
import TouristShowcase from "./TouristShowcase";

const TouristShowcaseContainer: React.FC = () => {
  const role = getCurrentUserRole();
  const {
    tourists,
    loading,
    loadingMore,
    hasMore,
    fetchTourists,
    loadMoreTourists,
  } = useTouristContext();

  useEffect(() => {
    fetchTourists();
  }, [fetchTourists]);

  return (
    <TouristShowcase
      tourists={tourists}
      role={role}
      loading={loading}
      loadingMore={loadingMore}
      hasMore={hasMore}
      loadMoreTourists={loadMoreTourists}
    />
  );
};
export default TouristShowcaseContainer;
