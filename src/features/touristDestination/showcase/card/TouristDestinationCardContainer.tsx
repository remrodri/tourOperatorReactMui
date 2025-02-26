import TouristDestinationCard from "./TouristDestinationCard";

interface TouristDestinationCardContainerProps {
  touristDestination: any;
}

const TouristDestinationCardContainer: React.FC<
  TouristDestinationCardContainerProps
> = ({ touristDestination }) => {
  const handleOption = (option: string) => {
    if (option === "Eliminar") {
      console.log("Eliminar::: ");
    }
    if (option === "Editar") {
      console.log("Editar::: ");
    }
    if (option === "Ver galeria") {
      console.log("more");
    }
  };

  return (
    <TouristDestinationCard
      touristDestination={touristDestination}
      handleOption={handleOption}
    />
  );
};
export default TouristDestinationCardContainer;
