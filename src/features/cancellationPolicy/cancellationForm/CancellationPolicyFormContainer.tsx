import { useFormik } from "formik";
import { cancellationSchema } from "./validation/cancellationSchema";
import CancellationPolicyForm from "./CancellationPolicyForm";
import { useCancellationConditionContext } from "../context/CancellationPolicyContext";
// import GlobalSnackbar from "../../../utils/snackbar/GlobalSnackbar";

interface CancellationPolicyFormContainerProps {
  open: boolean;
  handleClick: () => void;
}

const CancellationPolicyFormContainer: React.FC<
  CancellationPolicyFormContainerProps
> = ({ open, handleClick }) => {
  const { createCancellationPolicy } = useCancellationConditionContext();

  const onSubmit = async (values: any) => {
    // console.log("values::: ", values);
    await createCancellationPolicy(values);
  };
  const formik = useFormik({
    initialValues: {
      id:"",
      name: "",
      deadLine: 0,
      refoundPercentage: 0,
      description: "",
    },
    validationSchema: cancellationSchema,
    onSubmit,
  });
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
