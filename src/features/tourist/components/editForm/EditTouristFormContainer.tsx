import { useFormik } from "formik";
import { TouristType } from "../../../booking/types/TouristType";
import EditTouristForm from "./EditTouristForm";
import { touristSchema } from "./validation/toursitSchema";
import { TouristFormValues } from "./TouristFormValues";
import { useTouristContext } from "../../context/TouristContext";

export interface EditTouristFormContainerProps {
  open: boolean;
  handleClose: () => void;
  tourist: TouristType;
}

const EditTouristFormContainer: React.FC<EditTouristFormContainerProps> = ({
  open,
  handleClose,
  tourist,
}) => {
  const { updateTourist, updateOnlyTourist } = useTouristContext();

  const onSubmit = (values: TouristType) => {
    console.log("values::: ", values);
    // updateTourist(values);
    updateOnlyTourist(values);
    handleClose();
  };
  const formik = useFormik<TouristFormValues>({
    initialValues: {
      id: tourist.id,
      firstName: tourist.firstName,
      lastName: tourist.lastName,
      email: tourist.email,
      phone: tourist.phone,
      ci: tourist.ci || "",
      nationality: tourist.nationality,
      dateOfBirth: tourist.dateOfBirth,
      passportNumber: tourist.passportNumber || "",
      documentType: tourist.documentType,
      // tempId: tourist.tempId,
    },
    validationSchema: touristSchema,
    onSubmit,
    enableReinitialize: true,
  });
  return (
    <EditTouristForm
      open={open}
      handleClose={handleClose}
      formik={formik}
      // tourist={tourist}
    />
  );
};

export default EditTouristFormContainer;
