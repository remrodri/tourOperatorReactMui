import Itinerary from "./Itinerary";
import { useGuideContext } from "../../context/GuideContext";

const ItineraryContainer: React.FC = () => {
  const { loading, tourPackage } = useGuideContext();
  // console.log('tourPackage::: ', tourPackage);
  return <Itinerary loading={loading} tourPackage={tourPackage} />;
};
export default ItineraryContainer;
