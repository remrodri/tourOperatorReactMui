import { useState } from "react";
import TouristSearchByCode from "./TouristSearchByCode";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import { useTouristContext } from "../../../context/TouristContext";

const TouristSearchByCodeContainer: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { showSnackbar } = useNewSnackbar();
  const { fetchTourists, loading } = useTouristContext();

  const handleSearch = async () => {
    const value = searchValue.trim();
    if (!value) {
      showSnackbar("Ingresa un nombre o documento", "info");
      await fetchTourists("");
      return;
    }

    await fetchTourists(value);
    if (searchValue !== value) setSearchValue(value);
  };

  const handleClear = async () => {
    setSearchValue("");
    await fetchTourists("");
  };

  return (
    <TouristSearchByCode
      searchValue={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      onClear={handleClear}
      searching={loading}
    />
  );
};
export default TouristSearchByCodeContainer;
