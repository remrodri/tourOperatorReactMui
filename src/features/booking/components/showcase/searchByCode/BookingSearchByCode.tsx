import {
  Box,
  Button,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface BookingSearchByCodeProps {
  searchValue: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}
const BookingSearchByCode: React.FC<BookingSearchByCodeProps> = ({
  searchValue,
  onChange,
  onSearch,
  onClear,
}: BookingSearchByCodeProps) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <TextField
        variant="outlined"
        // variant="contained"
        margin="none"
        label="Buscar por codigo"
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch}
        size="small"
        slotProps={{
          input: {
            sx: {
              // backgroundColor: "rgba(15, 0, 36, 0.55)",
              // border: "1px solid rgba(10,10,10,0.6)",
              // background: "rgba(8, 13, 10, 0.4)",
              background: "rgba(8, 13, 10, 0.4)",
              // color: "white",
              p: 0,
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
                <Button
                  onClick={onSearch}
                  variant="contained"
                  sx={{ height: "2.5rem", boxShadow: "none" }}
                >
                  <SearchIcon />
                </Button>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiInputBase-input": { color: "white" }, // texto
          "& .MuiInputLabel-root": { color: "white", p: 0 }, // label
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            // borderColor: "rgba(10,10,10,0.6)",
            // background:"rgba(10,10,10,0.52)"
            // borderColor: "1px solid white",
            // borderColor: "rgba(236, 236, 236, 0.93)",
            borderColor: "rgba(8, 13, 10, 0.4)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderColor: "rgba(236, 236, 236, 0.93)",
            borderColor: "rgba(8, 13, 10, 0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // borderColor: "rgba(236, 236, 236, 0.93)",
            borderColor: "rgba(8, 13, 10, 0.4)",
          },
        }}
      />
      {/* <Button variant="contained" onClick={onSearch}>
        Buscar
      </Button> */}
    </Box>
  );
};
export default BookingSearchByCode;
