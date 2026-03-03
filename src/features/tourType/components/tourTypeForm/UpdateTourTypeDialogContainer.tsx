/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import CreateTourTypeDialog from "./CreateTourTypeDialog";
import { tourTypeSchema } from "./validation/tourTypeSchema";
import { useTourTypeContext } from "../../context/TourTypeContext";
// import NewSnackbar from "../../../../utils/snackbar/GlobalSnackbar";

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

  const isEdit = true;

  return (
    <>
      <CreateTourTypeDialog
        open={open}
        handleClick={handleClick}
        formik={formik}
        isEdit={isEdit}
      />
      {/* <NewSnackbar /> */}
    </>
  );
};

export default UpdateTourTypeDialogContainer;
