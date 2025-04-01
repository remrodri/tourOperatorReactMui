import { Role } from "../../types/Role";
import { User } from "../../types/User";
import MoreInfoModal from "./MoreInfoModal";

interface MoreInfoModalContainerProps {
  open: boolean;
  handleMoreInfoClick: () => void;
  user: User;
  userRole: Role;
}

const MoreInfoModalContainer: React.FC<MoreInfoModalContainerProps> = ({
  open,
  handleMoreInfoClick,
  user,
  userRole,
}) => {
  return (
    <MoreInfoModal
      open={open}
      handleMoreInfoClick={handleMoreInfoClick}
      user={user}
      userRole={userRole}
    />
  );
};
export default MoreInfoModalContainer;
