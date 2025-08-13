import { useFormik } from "formik";
import { cancellationSchema } from "./validation/cancellationSchema";
import CancellationPolicyForm from "./CancellationPolicyForm";
import { useCancellationConditionContext } from "../../context/CancellationPolicyContext";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import { useEffect, useState } from "react";
// import GlobalSnackbar from "../../../utils/snackbar/GlobalSnackbar";

interface CancellationPolicyFormContainerProps {
  open: boolean;
  handleClick: () => void;
  cancellationPolicy?: CancellationPolicy;
}
// type FromValues = {
//   id: string;
//   name: string;
//   deadLine: number;
//   refoundPercentage: number;
//   description: string;
// };

const CancellationPolicyFormContainer: React.FC<
  CancellationPolicyFormContainerProps
> = ({ open, handleClick, cancellationPolicy }) => {
  // console.log('cancellationPolicy::: ', cancellationPolicy);
  const { createCancellationPolicy, updateCancellationPolicy } =
    useCancellationConditionContext();
  // const [formValues, setFormValues] = useState<FromValues>({
  //   id: "",
  //   name: "",
  //   deadLine: 0,
  //   refoundPercentage: 0,
  //   description: "",
  // });

  const onSubmit = (values: any) => {
    if (cancellationPolicy) {
      // console.log('values::: ', values);
      updateCancellationPolicy(values, values.id);
      handleClick();
      return;
    }
    createCancellationPolicy(values);
    handleClick();
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      deadLine: 0,
      refoundPercentage: 0,
      description: "",
    },
    validationSchema: cancellationSchema,
    onSubmit,
  });
  // const formik = useFormik({
  //   initialValues: formValues,
  //   validationSchema: cancellationSchema,
  //   onSubmit,
  // });

  useEffect(() => {
    if (cancellationPolicy) {
      // setFormValues(cancellationPolicy);
      formik.setValues(cancellationPolicy);
    }
  }, [cancellationPolicy]);

  return (
    <>
      <CancellationPolicyForm
        open={open}
        handleClick={handleClick}
        formik={formik}
      />
      {/* <GlobalSnackbar /> */}
    </>
  );
};
export default CancellationPolicyFormContainer;
