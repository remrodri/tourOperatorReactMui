import { TourPackageType } from "../../../../../tourPackage/types/TourPackageType";
import DialogCard from "./DialogCard";

interface DialogCardContainerProps{
  tourPackage: TourPackageType;
}

const DialogCardContainer: React.FC<DialogCardContainerProps> = ({ tourPackage }) => {
    return (
        <DialogCard tourPackage={tourPackage} />
    )
}
export default DialogCardContainer