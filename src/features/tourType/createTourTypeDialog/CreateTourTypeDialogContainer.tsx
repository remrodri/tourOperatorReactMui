import { Interface } from "readline";
import CreateTourTypeDialog from "./CreateTourTypeDialog";
import { useTourTypeContext } from "../../userManagement/context/TourTypeContext";
import { useFormik } from "formik";
import { tourTypeSchema } from "./validation/tourTypeSchema";
import { useEffect } from "react";
import NewSnackbar from "../../../utils/snackbar/GlobalSnackbar";

interface CreateTourTypeDialogContainerProps {
  open: boolean;
  handleClick: () => void;
}
// interface CreateTourTypeDialogContainerProps {
//   tourType: { id: string; name: string; description: string };
// }

// const CreateTourTypeDialogContainer: React.FC<CreateTourTypeDialogContainerProps> = ({ tourType}) => {
const CreateTourTypeDialogContainer: React.FC<
  CreateTourTypeDialogContainerProps
> = ({ open, handleClick }) => {
  // console.log('tourType::: ', tourType);
  // const { openDialog, handleClick,registerTourType } = useTourTypeContext();
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

  // useEffect(() => {
  //   if (tourTypeToUpdate) {
  //     formik.setValues({
  //       name: tourTypeToUpdate.name,
  //       description: tourTypeToUpdate.description,
  //     })
  //   }
  // },[])

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
