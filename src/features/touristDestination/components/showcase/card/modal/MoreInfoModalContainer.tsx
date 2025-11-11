import { TouristDestinationType } from "../../../../types/TouristDestinationType";
import MoreInfoModal from "./MoreInfoModal";

interface MoreInfoModalContainerProps {
  handleClick: () => void;
  open: boolean;
  touristDestination: TouristDestinationType;
}

const MoreInfoModalContainer: React.FC<MoreInfoModalContainerProps> = ({
  handleClick,
  open,
  touristDestination,
}) => {
  return (
    <MoreInfoModal
      handleClick={handleClick}
      open={open}
      touristDestination={touristDestination}
    />
  );
};
export default MoreInfoModalContainer;
