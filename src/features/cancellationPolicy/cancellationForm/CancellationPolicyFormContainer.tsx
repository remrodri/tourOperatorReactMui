import { useFormik } from "formik";
import { cancellationSchema } from "./validation/cancellationSchema";
import CancellationPolicyForm from "./CancellationPolicyForm";
import { useCancellationConditionContext } from "../context/CancellationPolicyContext";
import { CancellationPolicy } from "../types/CancellationPolicy";
import { useEffect } from "react";
// import GlobalSnackbar from "../../../utils/snackbar/GlobalSnackbar";

interface CancellationPolicyFormContainerProps {
  open: boolean;
  handleClick: () => void;
  cancellationPolicy?: CancellationPolicy;
}

const CancellationPolicyFormContainer: React.FC<
  CancellationPolicyFormContainerProps
> = ({ open, handleClick,cancellationPolicy }) => {
  const { createCancellationPolicy } = useCancellationConditionContext();

  const onSubmit = (values: any) => {
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

  useEffect(() => { 
    
  },[])

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
