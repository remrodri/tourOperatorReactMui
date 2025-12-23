import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import DialogComponent from "./DialogComponent";

interface DialogComponentContainerProps {
  open: boolean;
  onClose: () => void;
  touristDestination: TouristDestinationType;
}

const DialogComponentContainer: React.FC<DialogComponentContainerProps> = ({
  open,
  onClose,
  touristDestination,
}) => {
  const { tourPackages } = useTourPackageContext();
  // console.log("::: ", tourPackages);
  const tourPackagesByTouristDestinationId = tourPackages.filter(
    (tourPackage) => tourPackage.touristDestination === touristDestination.id
  );

  return (
    <DialogComponent
      open={open}
      onClose={onClose}
      touristDestination={touristDestination}
      tourPackagesByTouristDestinationId={tourPackagesByTouristDestinationId}
    />
  );
};
export default DialogComponentContainer;
