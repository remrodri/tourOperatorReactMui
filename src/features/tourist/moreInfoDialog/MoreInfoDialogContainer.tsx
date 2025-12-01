// import { Role } from "../../types/Role";
// import { User } from "../../types/User";
import { TouristType } from "../../booking/types/TouristType";
import MoreInfoDialog from "./MoreInfoDialog";

interface MoreInfoDialogContainerProps {
  open: boolean;
  // handleMoreInfoClick: () => void;
  handleClose: () => void;
  tourist: TouristType;

  // user: User;
  // userRole: Role;
}

const MoreInfoDialogContainer: React.FC<MoreInfoDialogContainerProps> = ({
  open,
  // handleMoreInfoClick,
  handleClose,
  tourist,
  // user,
  // userRole,
}) => {
  console.log('tourist::: ', tourist);
  return (
    <MoreInfoDialog
      open={open}
      handleClose={handleClose}
      tourist={tourist}
      // user={user}
      // userRole={userRole}
    />
  );
};
export default MoreInfoDialogContainer;
