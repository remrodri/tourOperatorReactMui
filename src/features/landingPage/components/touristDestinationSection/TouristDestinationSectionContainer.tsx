// import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { useTouristDestinations } from "../../../touristDestination/hooks/useTouristDestinations";
import TouristDestinationSection from "./TouristDestinationSection";

const TouristDestinationSectionContainer: React.FC = () => {
  // const { touristDestinations } = useTouristDestinationContext();
  const { data, isLoading, isError } = useTouristDestinations();

  return (
    // <TouristDestinationSection touristDestinations={touristDestinations} />
    <TouristDestinationSection
      data={data}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default TouristDestinationSectionContainer;
