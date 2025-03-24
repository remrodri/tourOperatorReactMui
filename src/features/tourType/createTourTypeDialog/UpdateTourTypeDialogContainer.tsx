import { useFormik } from "formik";
import CreateTourTypeDialog from "./CreateTourTypeDialog";
import { Description } from "@mui/icons-material";
import { tourTypeSchema } from "./validation/tourTypeSchema";
import { useTourTypeContext } from "../context/TourTypeContext";
import NewSnackbar from "../../../utils/snackbar/GlobalSnackbar";
import { useNewSnackbar } from "../../../context/SnackbarContext";

interface CreateTourTypeDialogContainerProps {
  open: boolean;
  handleClick: () => void;
  tourType: { name: string; description: string; id: string };
}

const UpdateTourTypeDialogContainer: React.FC<
  CreateTourTypeDialogContainerProps
> = ({ open, handleClick, tourType }) => {
  const { updateTourType } = useTourTypeContext();

  const onSubmit = (values: any) => {
    updateTourType(values, tourType.id);
    handleClick();
  };

  const formik = useFormik({
    initialValues: {
      name: tourType.name,
      description: tourType.description,
    },
    validationSchema: tourTypeSchema,
    onSubmit,
  });

  return (
    <>
      <CreateTourTypeDialog
        open={open}
        handleClick={handleClick}
        formik={formik}
      />
      <NewSnackbar />
    </>
  );
};

export default UpdateTourTypeDialogContainer;
