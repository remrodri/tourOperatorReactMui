import { useFormik } from "formik";
import { TouristDestinationType } from "../../types/TouristDestinationType";
import TouristDestinationForm from "./TouristDestinationForm";
import { useState } from "react";
import { touristDestinationSchema } from "./validation/touristDestinationSchema";
import { useTouristDestinationContext } from "../../context/TouristDestinationContext";

interface TouristDestinationFormContainerProps {
  open: boolean;
  handleClick: () => void;
  touristDestination?: TouristDestinationType;
}

interface TouristDestinationFormValues {
  id?: string;
  name: string;
  description: string;
  newImages: File[];
  existingImages: string[];
}

const TouristDestinationFormContainer: React.FC<
  TouristDestinationFormContainerProps
> = ({ open, handleClick, touristDestination }) => {
  const [existingImages, setExistingImages] = useState<string[]>(
    touristDestination?.images.filter(
      (img): img is string => typeof img === "string"
    ) || []
  );
  const { createTouristDestination, updateTouristDestination } =
    useTouristDestinationContext();

  const onSubmit = (values: TouristDestinationFormValues) => {
    // console.log("values::: ", values);
    touristDestination
      ? updateTouristDestination(values)
      : createTouristDestination(values);
    handleClick();
  };

  const formik = useFormik<TouristDestinationFormValues>({
    initialValues: {
      id: touristDestination?.id ?? "",
      name: touristDestination?.name ?? "",
      description: touristDestination?.description ?? "",
      newImages: [],
      existingImages:
        touristDestination?.images?.filter(
          (img): img is string => typeof img === "string"
        ) || [],
    },
    validationSchema: touristDestinationSchema,
    onSubmit,
  });
  return (
    <TouristDestinationForm
      open={open}
      handleClick={handleClick}
      formik={formik}
    />
  );
};
export default TouristDestinationFormContainer;
