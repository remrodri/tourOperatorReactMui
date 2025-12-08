import { useState } from "react";
import { TouristType } from "../../../../booking/types/TouristType";
import TouristSearchByCode from "./TouristSearchByCode";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";

interface TouristSearchByCodeContainerProps {
  tourists: TouristType[] | null;
  setTouristFound: (tourist: TouristType | null) => void;
  touristFound: TouristType | null;
}
const TouristSearchByCodeContainer: React.FC<
  TouristSearchByCodeContainerProps
> = ({ tourists, setTouristFound, touristFound }) => {
  const [searchValue, setSearchValue] = useState("");
  const { showSnackbar } = useNewSnackbar();

  const handleSearch = () => {
    console.log("searchValue::: ", searchValue);
    if (!tourists) {
      return;
    }
    if (!searchValue) {
      showSnackbar("Ingresa un nro. de documento", "error");
      handleClear();
      return;
    }
    const TouristFound = tourists.find((tourist) =>
      tourist.documentType === "ci"
        ? tourist.ci?.toUpperCase().includes(searchValue.toUpperCase())
        : tourist.passportNumber
            ?.toUpperCase()
            .includes(searchValue.toUpperCase())
    );
    if (!TouristFound) {
      showSnackbar("No encontrado", "error");
    }
    setTouristFound(TouristFound || null);
    // handleClear();
  };

  const handleClear = () => {
    setSearchValue("");
    setTouristFound(null);
  };
  return (
    <TouristSearchByCode
      searchValue={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      onClear={handleClear}
      touristFound={touristFound}
    />
  );
};
export default TouristSearchByCodeContainer;
