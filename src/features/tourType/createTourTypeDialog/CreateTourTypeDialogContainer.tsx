import { Interface } from "readline";
import CreateTourTypeDialog from "./CreateTourTypeDialog";
import { useTourTypeContext } from "../../userManagement/context/TourTypeContext";
import { useFormik } from "formik";
import { tourTypeSchema } from "./validation/tourTypeSchema";

// interface CreateTourTypeDialogContainerProps {
//   open: boolean;
//   handleClick: () => void;
// }

const CreateTourTypeDialogContainer = () => {
  const { openDialog, handleClick,registerTourType } = useTourTypeContext();

  const onSubmit = (values: any) => {
    const response = registerTourType(values);
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
    <CreateTourTypeDialog
      openDialog={openDialog}
      handleClick={handleClick}
      formik={formik}
    />
  );
};
export default CreateTourTypeDialogContainer;
