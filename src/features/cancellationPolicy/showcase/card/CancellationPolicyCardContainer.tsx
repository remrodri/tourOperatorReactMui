import { useState } from "react";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import CancellationPolicyCard from "./CancellationPolicyCard";
import { Box } from "@mui/material";
import CancellationPolicyFormContainer from "../../cancellationForm/CancellationPolicyFormContainer";

interface CancellaionPolicyCardContainerProps {
  cancellationPolicy: CancellationPolicy;
}

const CancellationPolicyCardContainer: React.FC<
  CancellaionPolicyCardContainerProps
> = ({ cancellationPolicy }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOptionMenuCard = (option: string) => {
    console.log("option::: ", option);
  };

  return (
    <>
      <CancellationPolicyCard
        cancellationPolicy={cancellationPolicy}
        handleOptionMenuCard={ handleOptionMenuCard}
      />
      {openEdit && (
        <CancellationPolicyFormContainer
          open={openEdit}
          handleClick={handleOpenEdit}
        />
      )}
    </>
  );
};
export default CancellationPolicyCardContainer;
