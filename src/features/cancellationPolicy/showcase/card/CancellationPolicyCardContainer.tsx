import { useState } from "react";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import CancellationPolicyCard from "./CancellationPolicyCard";
import { Box } from "@mui/material";
import CancellationPolicyFormContainer from "../../cancellationForm/CancellationPolicyFormContainer";
import { useCancellationConditionContext } from "../../context/CancellationPolicyContext";

interface CancellaionPolicyCardContainerProps {
  cancellationPolicy: CancellationPolicy;
  // handleClick: () => void;
}

const CancellationPolicyCardContainer: React.FC<
  CancellaionPolicyCardContainerProps
> = ({ cancellationPolicy }) => {
  const [open, setOpen] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  const { deleteCancellationPolicy } = useCancellationConditionContext();

  // const handleOpenEdit = () => {
  //   setOpenEdit(!openEdit);
  // };
  const handleClick = () => {
    setOpen(!open);
  };

  const handleOptionMenuCard = (option: string) => {
    console.log("option::: ", option);
    if (option === "Eliminar") {
      deleteCancellationPolicy(cancellationPolicy.id);
    }
    if (option === "Editar") {
      handleClick();
    }
  };

  return (
    <>
      <CancellationPolicyCard
        cancellationPolicy={cancellationPolicy}
        handleOptionMenuCard={handleOptionMenuCard}
      />
      {open && (
        <CancellationPolicyFormContainer
          open={open}
          // handleClick={handleOpenEdit}
          handleClick={handleClick}
          cancellationPolicy={cancellationPolicy}
        />
      )}
    </>
  );
};
export default CancellationPolicyCardContainer;
