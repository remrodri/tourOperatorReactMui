import CreateTourTypeDialog from "./CreateTourTypeDialog";
import { useTourTypeContext } from "../../context/TourTypeContext";
import { useFormik } from "formik";
import { tourTypeSchema } from "./validation/tourTypeSchema";
import NewSnackbar from "../../../../utils/snackbar/GlobalSnackbar";

interface CreateTourTypeDialogContainerProps {
  open: boolean;
  handleClick: () => void;
}

const CreateTourTypeDialogContainer: React.FC<
  CreateTourTypeDialogContainerProps
> = ({ open, handleClick }) => {
  const { registerTourType } = useTourTypeContext();

  const onSubmit = async (values: any) => {
    await registerTourType(values);
    handleClick();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
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
export default CreateTourTypeDialogContainer;
