import SectionCard from "./SectionCard";
import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
import { useState } from "react";
import DialogComponentContainer from "../dialog/DialogComponentContainer";

interface SectionCardContainerProps {
  touristDestination: TouristDestinationType;
}

const SectionCardContainer: React.FC<SectionCardContainerProps> = ({
  touristDestination,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <SectionCard
        touristDestination={touristDestination}
        handleOpenDialog={handleOpenDialog}
      />
      <DialogComponentContainer
        open={openDialog}
        onClose={handleCloseDialog}
        touristDestination={touristDestination}
      />
    </>
  );
};
export default SectionCardContainer;
