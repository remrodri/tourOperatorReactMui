/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import type { FormikProps } from "formik";
import { BookingFormValues } from "./BookingFormContainer";
import {
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from "react";
import { TransitionProps } from "@mui/material/transitions";
import background from "../../../../assets/images/home.webp";
import { Close } from "@mui/icons-material";
import TouristForm from "./TouristForm";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import PaymentForm from "./PaymentForm";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { TouristType } from "../../types/TouristType";
import TouristCard from "./TouristCard";

interface BookingFormProps {
  open: boolean;
  handleClose: () => void;
  isEditing: boolean;
  formik: FormikProps<BookingFormValues>;
  handleMainTouristChange: (field: string, value: any) => void;
  handleRemoveTourist: (index: number) => void;
  handleTouristChange: (index: number, field: string, value: any) => void;
  handleAddAdditionalTourist: () => void;
  tourPackages: TourPackageType[];
  dateRanges: DateRangeType[];
  selectedTourPackage: TourPackageType | null;
  handleTourPackageChange: (value: string) => void;
  handleDateRangeChange: (value: string) => void;
  handlePaymentChange: (field: string, value: any) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  previewImage: string | null;
  fileSelected: File | null;
  handleAmountChange: (amount: number) => void;
  destinationImages: (string | File)[];
  // searchAndFillTourist: (
  //   type: "main" | "additional",
  //   value: string,
  //   index?: number
  // ) => void;
  handleOpenSearchTourist: () => void;
  touristsBySearch: TouristType[];
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingForm: React.FC<BookingFormProps> = ({
  open,
  handleClose,
  isEditing,
  formik,
  handleMainTouristChange,
  handleRemoveTourist,
  handleTouristChange,
  handleAddAdditionalTourist,
  handleTourPackageChange,
  tourPackages,
  dateRanges,
  selectedTourPackage,
  handleDateRangeChange,
  handlePaymentChange,
  handleFileChange,
  previewImage,
  fileSelected,
  handleAmountChange,
  destinationImages,
  // searchAndFillTourist,
  handleOpenSearchTourist,
  touristsBySearch,
}) => {
  // console.log('destinationImages::: ', destinationImages);
  // console.log('isEditing::: ', isEditing);
  // console.log('formik::: ', formik.values);
  // console.log('selectedTourPackage::: ', selectedTourPackage);
  const [isOpen, setIsOpen] = useState(false);
console.log('isEditing::: ', isEditing);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleCloseWithTransition = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleCloseWithTransition}
      TransitionComponent={Transition}
      TransitionProps={{
        timeout: 300,
        onExited: handleClose,
      }}
      PaperProps={{
        sx: {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
      }}
    >
      <DialogTitle
        sx={{
          // p:2,
          background: "rgba(0, 0, 0, 0.45)",
          // borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.45)",
        }}
      >
        <TextType
          className="text-lg"
          text={isEditing ? "Editar reserva" : "Nueva reserva"}
          typingSpeed={50}
          pauseDuration={1000}
          showCursor={true}
          cursorCharacter="_"
          deletingSpeed={50}
        />
      </DialogTitle>
      <IconButton
        onClick={handleCloseWithTransition}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: !isEditing
                ? "1fr 1fr 1fr"
                : "1fr 1fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
              gap: 1,
              height: "100%",
              width: "100%",
              overflowY: "auto",
              // p:1,
            }}
          >
            <Box
              sx={{
                gridRow: !isEditing ? "1/7" : "1/6",
                gridColumn: !isEditing ? "1/2" : "1/3",
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  background: "rgba(20, 34, 64, 0.7)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(0, 0, 0, 0.45)",
                  height: "100%",
                  p: 1,
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ pl: 1 }}>
                    {/* 1. Turista */}
                    <TextType
                      className="text-lg"
                      text="1. Turista"
                      typingSpeed={50}
                      pauseDuration={1000}
                      showCursor={true}
                      cursorCharacter="_"
                      deletingSpeed={50}
                    />
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleOpenSearchTourist}
                    color="info"
                  >
                    Buscar por documento
                  </Button>
                  {touristsBySearch.map((tourist) => (
                    <TouristCard key={tourist.id} tourist={tourist} />
                  ))}
                  <Divider
                    variant="middle"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.45)",
                    }}
                  />
                  <Typography sx={{ pl: 1 }}>Nuevo turista</Typography>
                  <TouristForm
                    tourist={formik.values.mainTourist || {}}
                    onChange={handleMainTouristChange}
                    errors={formik.errors.mainTourist}
                    touched={formik.touched.mainTourist}
                    // searchAndFillTourist={searchAndFillTourist}
                    // isMain={true}
                  />
                  {formik.values.additionalTourists?.map((tourist, index) => (
                    <Box
                      key={tourist.tempId || tourist.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Divider
                        variant="middle"
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.45)",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle1">
                          {/* {`Turista ${index + 2}`} */}
                          {/* <TextType
                              className="text-lg"
                              text={`Turista ${index+2}`}
                              typingSpeed={50}
                              pauseDuration={1000}
                              showCursor={true}
                              cursorCharacter="_"
                              deletingSpeed={50}
                            /> */}
                          Nuevo turista
                        </Typography>
                        {!tourist.id && (
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleRemoveTourist(index)}
                          >
                            Eliminar
                          </Button>
                        )}
                      </Box>
                      <TouristForm
                        tourist={tourist}
                        onChange={(field, value) =>
                          handleTouristChange(index, field, value)
                        }
                        errors={formik.errors.additionalTourists?.[index]}
                        touched={formik.touched.additionalTourists?.[index]}
                        // searchAndFillTourist={searchAndFillTourist}
                        // isMain={false}
                      />
                    </Box>
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  color="info"
                  size="small"
                  onClick={handleAddAdditionalTourist}
                  // sx={{ mt: 1 }}
                >
                  Agregar turista
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                gridRow: !isEditing ? "1/6" : "1/6",
                gridColumn: !isEditing ? "2/3" : "3/5",
                // ...(isEditing && {
                //   display:"none"
                // }),
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  background: "rgba(20, 34, 64, 0.7)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(0, 0, 0, 0.45)",
                  height: "100%",
                  p: 1,
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ pl: 1 }}>
                    <TextType
                      className="text-lg"
                      text="2. Paquete Turístico"
                      typingSpeed={50}
                      pauseDuration={1000}
                      showCursor={true}
                      cursorCharacter="_"
                      deletingSpeed={50}
                    />
                  </Typography>
                  <Box>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Paquete Turístico</InputLabel>
                      <Select
                        disabled={isEditing}
                        labelId="tourPackageId"
                        id="tourPackageId"
                        label="Paquete Turístico"
                        {...formik.getFieldProps("tourPackageId")}
                        onChange={(e) =>
                          handleTourPackageChange(e.target.value as string)
                        }
                        error={
                          formik.touched.tourPackageId &&
                          Boolean(formik.errors.tourPackageId)
                        }
                      >
                        {tourPackages.map((tourPackage) => (
                          <MenuItem key={tourPackage.id} value={tourPackage.id}>
                            {tourPackage.name} - {tourPackage.price} Bs.
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formik.errors.tourPackageId && (
                      <Typography
                        color="error"
                        sx={{ fontSize: "12px", pt: "4px", pl: "12px" }}
                      >
                        {formik.errors.tourPackageId}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Fecha de Reserva</InputLabel>
                      <Select
                        disabled={isEditing}
                        labelId="dateRangeId"
                        id="dateRangeId"
                        label="Fecha de Reserva"
                        {...formik.getFieldProps("dateRangeId")}
                        onChange={(e) =>
                          handleDateRangeChange(e.target.value as string)
                        }
                        error={
                          formik.touched.dateRangeId &&
                          Boolean(formik.errors.dateRangeId)
                        }
                      >
                        {dateRanges && dateRanges.length > 0 ? (
                          dateRanges.map((dateRange: DateRangeType) => {
                            if (dateRange.dates && dateRange.dates.length > 0) {
                              return (
                                <MenuItem
                                  key={dateRange.id}
                                  value={dateRange.id}
                                >
                                  {dateRange.dates.length > 1
                                    ? `${dateRange.dates[0]} - ${
                                        dateRange.dates[
                                          dateRange.dates.length - 1
                                        ]
                                      }`
                                    : dateRange.dates[0]}
                                </MenuItem>
                              );
                            }
                          })
                        ) : (
                          <MenuItem value="">
                            No hay fechas disponibles
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                  {formik.errors.dateRangeId && (
                    <Typography
                      color="error"
                      sx={{ fontSize: "12px", pt: "4px", pl: "12px" }}
                    >
                      {formik.errors.dateRangeId}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "6px",
                    p: "5px 10px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Precio Total (Bs.): {formik.values.totalPrice}
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="Notas"
                    multiline
                    rows={3}
                    {...formik.getFieldProps("notes")}
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                    helperText={formik.touched.notes && formik.errors.notes}
                    fullWidth
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    ...(isEditing ? { justifyContent: "center" } : {}),
                  }}
                >
                  {destinationImages?.length > 0 &&
                    destinationImages?.map((image, index) => (
                      <Box key={index}>
                        <img
                          src={`http://localhost:3000${image}`}
                          alt=""
                          style={{
                            display: "flex",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "6px",
                          }}
                        />
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
            {!isEditing && (
              <Box
                sx={{
                  gridRow: "1/7",
                  gridColumn: "3/4",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    background: "rgba(20, 34, 64, 0.7)",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(0, 0, 0, 0.85)",
                    height: "100%",
                    p: 1,
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6">
                      <TextType
                        className="text-lg"
                        text="3. Información de Pago"
                        typingSpeed={50}
                        pauseDuration={1000}
                        showCursor={true}
                        cursorCharacter="_"
                        deletingSpeed={50}
                      />
                    </Typography>
                    <PaymentForm
                      payment={formik.values.firstPayment}
                      onChange={handlePaymentChange}
                      errors={formik.errors.firstPayment}
                      touched={formik.touched.firstPayment}
                      isEditing={isEditing}
                      handleFileChange={handleFileChange}
                      previewImage={previewImage}
                      fileSelected={fileSelected}
                      handleAmountChange={handleAmountChange}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                gridRow: "6/7",
                gridColumn: !isEditing ? "2/3" : "1/5",
                ...(isEditing && {
                  display: "flex",
                  // alignItems:"center",
                  // justifyContent:"center",
                  width: "100%",
                }),
                p: 1,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  background: "rgba(0, 0, 0, 0.45)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(0, 0, 0, 0.45)",
                  p: 2,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{
                    height: "2rem",
                    width: !isEditing ? "100%" : "20rem",
                  }}
                >
                  {isEditing ? "Editar" : "Guardar"}
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleCloseWithTransition}
                  sx={{
                    height: "2rem",
                    width: !isEditing ? "100%" : "20rem",
                  }}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default BookingForm;
