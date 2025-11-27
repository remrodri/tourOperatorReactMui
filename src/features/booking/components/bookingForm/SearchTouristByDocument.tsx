import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Document } from "@react-pdf/renderer";

interface SearchTouristByDocumentProps {
  open: boolean;
  onClose: () => void;
  documentNumber: string;
  setDocumentNumber: (documentNumber: string) => void;
  searchTourist: () => void;
}

const SearchTouristByDocument: React.FC<SearchTouristByDocumentProps> = ({
  documentNumber,
  open,
  onClose,
  setDocumentNumber,
  searchTourist,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ width: "25rem" }}>Buscar por documento</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "25rem",
        }}
      >
        <Typography>
          Si el turista ya se registro anteriormente se agregaran sus datos
          automaticamente
        </Typography>
        <TextField
          label="Nro. de ci o pasaporte"
          size="small"
          value={documentNumber}
          // onChange={(e) => documentNumber(e.target.value)}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={searchTourist} variant="contained" color="success">
          Buscar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchTouristByDocument;
