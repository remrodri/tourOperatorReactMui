import { RoleType } from "../../types/RoleType";
import { UserType } from "../../types/UserType";
import MoreInfoModal from "./MoreInfoModal";

interface MoreInfoModalContainerProps {
  open: boolean;
  handleMoreInfoClick: () => void;
  user: UserType;
  userRole: RoleType;
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
