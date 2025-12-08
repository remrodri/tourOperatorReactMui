import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import { TouristType } from "../../../../booking/types/TouristType";

interface TouristSearchByCodeProps {
  searchValue: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  touristFound: TouristType | null;
}

const TouristSearchByCode: React.FC<TouristSearchByCodeProps> = ({
  searchValue,
  onChange,
  onSearch,
  onClear,
  touristFound,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <TextField
        variant="outlined"
        margin="none"
        label="Nro. de documento"
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch}
        size="small"
        slotProps={{
          input: {
            sx: {
              backgroundColor: "rgba(8, 13, 10, 0.4)",
              color: "white",
              p: 0,
              width: "20rem",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={
                  {
                    // backgroundColor: "rgba(8, 13, 10, 0.4)",
                    // display: "flex",
                  }
                }
              >
                {touristFound === null ? (
                  <Button
                    color="success"
                    onClick={onSearch}
                    variant="contained"
                    sx={{ height: "2.4rem", boxShadow: "none" }}
                  >
                    <SearchIcon />
                  </Button>
                ) : (
                  <Button
                    onClick={onClear}
                    variant="contained"
                    disabled={searchValue === ""}
                    color="error"
                    sx={{ height: "2.4rem", boxShadow: "none" }}
                  >
                    <ClearIcon />
                  </Button>
                )}
              </InputAdornment>
            ),
          },
        }}
        sx={{
          // Texto dentro del input
          "& .MuiInputBase-input": {
            color: "white",
          },
          // Label normal y enfocado
          "& .MuiInputLabel-root": {
            // color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          // Estilos del contenedor del input
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(10,10,10,0.52)", // fondo oscuro
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde normal
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde enfocado
            },
          },
        }}
      />
    </Box>
  );
};
export default TouristSearchByCode;
