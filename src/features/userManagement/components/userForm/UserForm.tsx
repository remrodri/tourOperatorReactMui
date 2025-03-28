import { Dialog } from "@mui/material";
import { User } from "../../types/User";

interface UserFormProps {
  open: boolean;
  handleClick: () => void;
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ open, handleClick, user }) => {
  return (
    <Dialog onClose={handleClick} open={open}>
      form
    </Dialog>
  );
};
export default UserForm;
