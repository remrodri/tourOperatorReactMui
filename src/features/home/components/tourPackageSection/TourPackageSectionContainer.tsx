import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import TourPackageSection from "./TourPackageSection";

const TourPackageSectionContainer: React.FC = () => {
  const { tourPackages } = useTourPackageContext();
  return <TourPackageSection tourPackages={tourPackages} />;
};
export default TourPackageSectionContainer;
