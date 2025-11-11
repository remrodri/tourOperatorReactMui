import { useEffect, useState } from "react";
// import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";

import TourPackageModal from "./MoreInfoModal";
import { CancellationPolicy } from '../../../../types/CancellationPolicy';

interface MoreInfoModalContainerProps {
  handleClick: () => void;
  open: boolean;
  cancellationPolicy: CancellationPolicy;
}

const MoreInfoModalContainer: React.FC<MoreInfoModalContainerProps> = ({
  handleClick,
  open,
  cancellationPolicy,
}) => {
  return (
    <TourPackageModal
      handleClick={handleClick}
      open={open}
      cancellationPolicy={cancellationPolicy}
    />
  );
};
export default MoreInfoModalContainer;
