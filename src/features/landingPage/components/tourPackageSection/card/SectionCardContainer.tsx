import SectionCard from "./SectionCard";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";

interface SectionCardContainerProps {
  tourPackage: TourPackageType;
}
const SectionCardContainer: React.FC<SectionCardContainerProps> = ({
  tourPackage,
}) => {
  return <SectionCard tourPackage={tourPackage} />;
};
export default SectionCardContainer;
