import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { TourPackageType } from "../../types/TourPackageType";
import { DateRangeType } from "../../types/DateRangeType";
import CloseIcon from "@mui/icons-material/Close";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface MoreInfoModalProps {
  handleClick: () => void;
  open: boolean;
  tourPackage: TourPackageType;
  // dateRangesFilled: DateRangeType[];
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({
  handleClick,
  open,
  tourPackage,
  // dateRangesFilled,
}) => {
  // console.log("dateRangesFilled::: ", dateRangesFilled);
  console.log("tourPackage::: ", tourPackage);

  // const showSelectedDays = () => {
  //   return <>{tourPackage.selectedDates.}</>;
  // };

  return (
    <Dialog
      onClose={handleClick}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(46, 46, 46, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 37, 37, 0.5)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            // width: "calc(100% - 65px)",
            // padding: "0 0 0 4rem",
          }}
        >
          <TextType
            text="Información"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
          />
        </DialogTitle>
        <IconButton
          autoFocus
          aria-label="close"
          onClick={handleClick}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <p style={{ marginTop: 0 }}>Nombre: {tourPackage.name}</p>
        <p>Destino turistico: {tourPackage.touristDestination}</p>
        <p>Precio: {tourPackage.price}</p>
        <p>Duracion: {tourPackage.duration} dias</p>
        <p>tipo de tour: {tourPackage.tourType}</p>
        <p>Politica de cancelacion: {tourPackage.cancellationPolicy}</p>
        <p>Fechas:</p>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem",
            width: "15rem",
          }}
        >
          {/* {dateRangesFilled.map((dr) =>
            dr.dates?.map((date, index) => <Chip key={index} label={date} />)||[]
          )} */}
          {tourPackage.dateRanges.map(
            (dr: DateRangeType) =>
              dr.dates?.map((date, index) => (
                <Chip key={index} label={date} />
              )) || []
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // width:"90%"
          }}
        >
          <p>Actividades:</p>
          {tourPackage.itinerary.days.map((day, index) => (
            <Box key={index}>
              <p style={{ margin: "0.5rem 0 0 0" }}>Dia: {day.dayNumber}</p>
              <>
                {day.activities.map((activity, index) => (
                  <Box key={index}>
                    <p style={{ margin: "0 0 0 0" }}>
                      Actividad: {activity.description}
                    </p>
                    <p style={{ margin: "0 0 0 0" }}>Hora: {activity.time}</p>
                  </Box>
                ))}
              </>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoModal;
