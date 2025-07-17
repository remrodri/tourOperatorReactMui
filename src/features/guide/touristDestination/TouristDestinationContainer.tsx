import { useGuideContext } from "../context/GuideContext";
import TouristDestination from "./TouristDestination";

const TouristDestinationContainer: React.FC = () => {
  const { loading } = useGuideContext();
  return <TouristDestination loading={loading} />;
};
export default TouristDestinationContainer;
