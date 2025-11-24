import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";

interface BookingFilterProps {
  status: string;
  tourPackageId: string;
  onStatusChange: (status: string) => void;
  onTourPackageIdChange: (tourPackageId: string) => void;
  tourPackages: TourPackageType[] | null;
}
const BookingFilter: React.FC<BookingFilterProps> = ({
  status,
  tourPackageId,
  onStatusChange,
  onTourPackageIdChange,
  tourPackages,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        gap: "1rem",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel
          sx={{
            color: "white", // color del texto del label
            "&.Mui-focused": {
              color: "white", // cuando está enfocado
            },
          }}
        >
          Estado
        </InputLabel>
        <Select
          label="Estado"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          sx={{
            "& .MuiSelect-select": {
              // color: "black", // texto
              background: "rgba(8, 13, 10, 0.4)", // fondo
              // p: 0,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde normal
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde focus
            },
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="pending">Pendientes</MenuItem>
          <MenuItem value="completed">Completados</MenuItem>
          <MenuItem value="cancelled">Cancelados</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel
          sx={{
            color: "white", // color del texto del label
            "&.Mui-focused": {
              color: "white", // cuando está enfocado
            },
          }}
        >
          Paquete
        </InputLabel>
        <Select
          label="Paquete"
          value={tourPackageId}
          onChange={(e) => onTourPackageIdChange(e.target.value)}
          sx={{
            "& .MuiSelect-select": {
              // color: "black", // texto
              background: "rgba(8, 13, 10, 0.4)", // fondo
              // p: 0,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde normal
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(8, 13, 10, 0.4)", // borde focus
            },
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {tourPackages?.map((tourPackage) => (
            <MenuItem key={tourPackage.id} value={tourPackage.id}>
              {tourPackage.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default BookingFilter;
