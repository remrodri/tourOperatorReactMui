import { useTourTypeContext } from "../../../../userManagement/context/TourTypeContext";
// import { useTourType } from "../hook/useTourType";
import DeleteDialog from "./DeleteDialog";

interface DeleteDialogContainerProps {
  open: boolean;
  handleClose: () => void;
  id: string;
}

const DeleteDialogContainer: React.FC<DeleteDialogContainerProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { deleteTourType } = useTourTypeContext();

  const handleDelete = () => {
    deleteTourType({ id });
    handleClose();
  };
  // const {} = useTourTypeContext();
  return (
    <DeleteDialog
      open={open}
      handleClose={handleClose}
      handleDelete={handleDelete}
    />
  );
};
export default DeleteDialogContainer;
