import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClearIcon } from "@mui/x-date-pickers/icons";

interface TouristSearchByCodeProps {
  searchValue: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  searching?: boolean;
}

const TouristSearchByCode: React.FC<TouristSearchByCodeProps> = ({
  searchValue,
  onChange,
  onSearch,
  onClear,
  searching = false,
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
        label="Nombre o documento"
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
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
              <InputAdornment position="end">
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    color="success"
                    onClick={onSearch}
                    variant="contained"
                    disabled={searching}
                    sx={{ height: "2.4rem", boxShadow: "none" }}
                  >
                    <SearchIcon />
                  </Button>
                  {searchValue !== "" && (
                    <Button
                      onClick={onClear}
                      variant="contained"
                      color="error"
                      sx={{ height: "2.4rem", boxShadow: "none" }}
                    >
                      <ClearIcon />
                    </Button>
                  )}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(10,10,10,0.52)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)",
            },
          },
        }}
      />
    </Box>
  );
};
export default TouristSearchByCode;
