import { useState } from "react";
import CancellationPolicyShowcase from "./CancellationPolicyShowcase";
import CancellationPolicyFormContainer from "../cancellationForm/CancellationPolicyFormContainer";
import { useCancellationConditionContext } from "../context/CancellationPolicyContext";
import { Box } from "@mui/material";

const CancellationPolicyShowcaseContainer: React.FC = () => {
  const { cancellationPolicy } = useCancellationConditionContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <
      // height={"100%"}
      // sx={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems:"center"
      // }}
    >
      <CancellationPolicyShowcase
        handleClick={handleClick}
        cancellationPolicy={cancellationPolicy}
      />
      {open && (
        <CancellationPolicyFormContainer
          open={open}
          handleClick={handleClick}
        />
      )}
    </>
  );
};
export default CancellationPolicyShowcaseContainer;
