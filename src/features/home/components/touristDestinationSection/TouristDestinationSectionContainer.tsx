import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import TouristDestinationSection from "./TouristDestinationSection";

const TouristDestinationSectionContainer: React.FC = () => {
  const { touristDestinations } = useTouristDestinationContext();

  return (
    <TouristDestinationSection touristDestinations={touristDestinations} />
  );
};

export default TouristDestinationSectionContainer;
