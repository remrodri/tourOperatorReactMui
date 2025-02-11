import { useState } from "react";
import CancellationPolicyShowcase from "./CancellationPolicyShowcase";
import CancellationPolicyFormContainer from "./cancellationForm/CancellationPolicyFormContainer";

const CancellationPolicyShowcaseContainer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <CancellationPolicyShowcase handleClick={handleClick} />
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
