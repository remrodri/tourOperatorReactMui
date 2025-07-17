import { useGuideContext } from "../context/GuideContext";
import TouristDestination from "./TouristDestination";

const TouristDestinationContainer: React.FC = () => {
  const { loading ,touristDestination} = useGuideContext();
  return <TouristDestination loading={loading} touristDestination={touristDestination} />;
};
export default TouristDestinationContainer;
