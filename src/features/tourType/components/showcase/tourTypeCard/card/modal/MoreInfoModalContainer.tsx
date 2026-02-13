
import TourPackageModal from "./MoreInfoModal";

interface MoreInfoModalContainerProps {
  handleClick: () => void;
  open: boolean;
  tourType: {
    name: string;
    description: string;
  };
}

const MoreInfoModalContainer: React.FC<MoreInfoModalContainerProps> = ({
  handleClick,
  open,
  tourType,
}) => {
  return (
    <TourPackageModal
      handleClick={handleClick}
      open={open}
      tourType={tourType}
    />
  );
};
export default MoreInfoModalContainer;
