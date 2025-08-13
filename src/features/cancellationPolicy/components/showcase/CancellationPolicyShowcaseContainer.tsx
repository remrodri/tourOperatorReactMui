import { useState } from "react";
import CancellationPolicyShowcase from "./CancellationPolicyShowcase";
import CancellationPolicyFormContainer from "../cancellationForm/CancellationPolicyFormContainer";
import { useCancellationConditionContext } from "../../context/CancellationPolicyContext";
import { Box, Fade } from "@mui/material";

const CancellationPolicyShowcaseContainer: React.FC = () => {
  const { cancellationPolicy } = useCancellationConditionContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Fade in={true} timeout={1000}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <CancellationPolicyShowcase
            handleClick={handleClick}
            cancellationPolicy={cancellationPolicy}
          />
        </Box>
      </Fade>
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
