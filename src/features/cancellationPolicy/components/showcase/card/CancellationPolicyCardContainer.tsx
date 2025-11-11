import { useState } from "react";
import { CancellationPolicy } from "../../../types/CancellationPolicy";
import CancellationPolicyCard from "./CancellationPolicyCard";
import { Box } from "@mui/material";
import CancellationPolicyFormContainer from "../../cancellationForm/CancellationPolicyFormContainer";
import { useCancellationConditionContext } from "../../../context/CancellationPolicyContext";
import MoreInfoModalContainer from "./modal/MoreInfoModalContainer";

interface CancellaionPolicyCardContainerProps {
  cancellationPolicy: CancellationPolicy;
  // handleClick: () => void;
}

const CancellationPolicyCardContainer: React.FC<
  CancellaionPolicyCardContainerProps
> = ({ cancellationPolicy }) => {
  const [open, setOpen] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);

  const handleClickMoreInfo = () => {
    setOpenMoreInfo(!openMoreInfo);
  };

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
    if (option === "Ver mas") {
      handleClickMoreInfo();
    }
  };

  const truncateText = (text: string, limit: number) => {
    return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;
  }

  return (
    <>
      <CancellationPolicyCard
        cancellationPolicy={cancellationPolicy}
        handleOptionMenuCard={handleOptionMenuCard}
        truncateText={truncateText}
      />
      {open && (
        <CancellationPolicyFormContainer
          open={open}
          // handleClick={handleOpenEdit}
          handleClick={handleClick}
          cancellationPolicy={cancellationPolicy}
        />
      )}
      {openMoreInfo && (
        <MoreInfoModalContainer
          open={openMoreInfo}
          handleClick={handleClickMoreInfo}
          cancellationPolicy={cancellationPolicy}
        />
      )}
    </>
  );
};
export default CancellationPolicyCardContainer;
