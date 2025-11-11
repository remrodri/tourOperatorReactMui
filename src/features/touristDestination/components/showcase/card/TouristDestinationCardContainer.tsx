import { useState } from "react";
import TouristDestinationCard from "./TouristDestinationCard";
import TouristDestinationFormContainer from "../../touristDestinationForm/TouristDestinationFormContainer";
import { useTouristDestinationContext } from "../../../context/TouristDestinationContext";
import GalleryContainer from "../../../../gallery/GalleryContainer";
import MoreInfoModalContainer from "./modal/MoreInfoModalContainer";

interface TouristDestinationCardContainerProps {
  touristDestination: any;
}

const TouristDestinationCardContainer: React.FC<
  TouristDestinationCardContainerProps
> = ({ touristDestination }) => {
  const [open, setOpen] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);

  const { deleteTouristDestination } = useTouristDestinationContext();

  const handleClickMoreInfo = () => {
    setOpenMoreInfo(!openMoreInfo);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpenGalleryClick = () => {
    setOpenGallery(!openGallery);
  };

  const handleOption = (option: string) => {
    if (option === "Dar de baja") {
      // console.log("Eliminar::: ");
      deleteTouristDestination(touristDestination.id);
    }
    if (option === "Editar") {
      // console.log("Editar::: ");
      handleClick();
    }
    if (option === "Ver galeria") {
      // console.log("ver galeria");
      handleOpenGalleryClick();
    }
    if (option === "Ver mas") {
      handleClickMoreInfo();
    }
  };

  return (
    <>
      <TouristDestinationCard
        touristDestination={touristDestination}
        handleOption={handleOption}
      />
      {open && (
        <TouristDestinationFormContainer
          open={open}
          handleClick={handleClick}
          touristDestination={touristDestination}
        />
      )}
      {openGallery && (
        <GalleryContainer
          open={openGallery}
          handleClick={handleOpenGalleryClick}
          images={touristDestination.images}
        />
      )}
      {openMoreInfo && (
        <MoreInfoModalContainer
          open={openMoreInfo}
          handleClick={handleClickMoreInfo}
          touristDestination={touristDestination}
        />
      )}
    </>
  );
};
export default TouristDestinationCardContainer;
