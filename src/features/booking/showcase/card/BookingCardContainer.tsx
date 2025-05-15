import { useEffect, useState } from "react";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { usePaymentContext } from "../../../payment/context/PaymentContext";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useUserContext } from "../../../userManagement/context/UserContext";
import { BookingType } from "../../types/BookingType";
import BookingCard from "./BookingCard";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import MoreInfoDialogContainer from "../../moreInfoDialog/MoreInfoDialogContainer";
import { Card, Slide, Typography } from "@mui/material";
import { TouristType } from "../../types/TouristType";
import BookingFormContainer from "../../bookingForm/BookingFormContainer";

interface BookingContainerProps {
  booking?: BookingType; // Make booking optional
  index: number;
  openEditForm: boolean;
  handleClick: () => void;
}

const BookingCardContainer: React.FC<BookingContainerProps> = ({
  booking,
  index,
  openEditForm,
  handleClick,
}) => {
  const { getTouristById, touristFound } = useTouristContext();
  const { getUserById, userFound } = useUserContext();
  const { getPaymentsById, paymentsFound, getTotalPaid } = usePaymentContext();
  const { getDateRangeById } = useDateRangeContext();
  const [dateRangeInfo, setDateRangeInfo] = useState<DateRangeType | null>(
    null
  );
  const { findTourPackageById, tpFound } = useTourPackageContext();
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touristInfo, setTouristInfo] = useState<TouristType | null>(null);
  const [totalPaid, setTotalPaid] = useState(0);
  const { fetchTourists } = useTouristContext();

  // console.log("touristFound::: ", touristFound);
  const getTouristInfo = async (id: string) => {
    if (!id) {
      console.warn("tourist called without id");
      return null;
    }
    const tourist = await getTouristById(id);
    if (!tourist) {
      console.warn("tourist not found");
      return null;
    }
    setTouristInfo(tourist);
  };

  const getBalance = (): number => {
    // const price = tpFound?.price || 0;
    // const totalAmountPaid = paymentsFound?.reduce(
    //   (sum, payment) => sum + (payment?.amount || 0),
    //   0
    // );

    // return price - totalAmountPaid;
    const totalPrice = booking?.totalPrice || 0;
    const balance = totalPrice - totalPaid;
    // return balance.toFixed(2);
    return balance;
  };

  const handleOpenInfo = () => {
    setOpenMoreInfo(true);
  };
  const handleCloseInfo = () => {
    setOpenMoreInfo(false);
  };

  const handleMenuOptions = (option: string) => {
    switch (option) {
      case "Ver detalles":
        // handleOpenMoreInfoClick();
        handleOpenInfo();
        break;
      case "Editar":
        console.log("Editar::: ");
        handleClick();
        break;
      case "Registrar pago":
        console.log("pagar::: ");
        break;
      default:
        console.log("Opcion invalida");
        break;
    }
  };

  const loadTotalPaid = (paymentIds: string[]): void => {
    const totalPaid = getTotalPaid(booking?.paymentIds || []);
    setTotalPaid(totalPaid);
  };
  const getDateRangeInfo = async (id: string) => {
    if (id) {
      const dateRange = await getDateRangeById(id);
      setDateRangeInfo(dateRange);
    }
  };

  const getTouristInfoById = async (id: string) => {
    if (id) {
      await getTouristById(id);
    }
  };

  const getSellerById = async (id: string) => {
    if (id) {
      await getUserById(id);
    }
  };

  // Función para cargar todos los datos necesarios
  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // Verificar que booking exista y tenga todas las propiedades necesarias
      if (!booking) {
        console.log("No booking data available");
        setIsLoading(false);
        return;
      }

      // Añade validaciones para cada llamada
      if (booking.sellerId) {
        await getSellerById(booking.sellerId);
      }

      // if (booking.mainTouristId) {
      //   await getTouristInfoById(booking.mainTouristId);
      // }
      if (booking.mainTouristId) {
        await getTouristInfo(booking.mainTouristId);
      }

      if (booking.paymentIds && booking.paymentIds.length > 0) {
        await getPaymentsById(booking.paymentIds);
      }

      if (booking.dateRangeId) {
        await getDateRangeInfo(booking.dateRangeId);
      }
      if (booking.tourPackageId) {
        await findTourPackageById(booking.tourPackageId);
      }
      if (booking.paymentIds) {
        loadTotalPaid(booking.paymentIds);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchTourists();
    loadAllData();
  }, [booking]);

  // Si no hay datos de booking, muestra un mensaje
  if (!booking) {
    return (
      <Card
        sx={{
          width: 300,
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <Typography>No hay datos de reserva disponibles</Typography>
      </Card>
    );
  }

  // Si estamos cargando datos, muestra un indicador
  if (isLoading) {
    return (
      <Card
        sx={{
          width: 300,
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <Typography>Cargando datos...</Typography>
      </Card>
    );
  }

  return (
    <>
      <BookingCard
        booking={booking}
        sellerInfo={userFound}
        touristInfo={touristInfo}
        paymentsInfo={paymentsFound || []}
        dateRangeInfo={dateRangeInfo}
        tourPackageInfo={tpFound}
        index={index}
        handleMenuOptions={handleMenuOptions}
        balance={getBalance}
      />
      {openMoreInfo && (
        <MoreInfoDialogContainer
          open={openMoreInfo}
          // handleOpenMoreInfoClick={handleOpenMoreInfoClick}
          // handleOpen={handleOpenInfo}
          handleClose={handleCloseInfo}
          booking={booking}
          sellerInfo={userFound}
          touristInfo={touristInfo}
          paymentsInfo={paymentsFound}
          dateRangeInfo={dateRangeInfo}
          tourPackageInfo={tpFound}
          balance={getBalance()}
        />
      )}
      {openEditForm && (
        <BookingFormContainer
          open={openEditForm}
          handleClick={handleClick}
          booking={booking}
        />
      )}
    </>
  );
};

export default BookingCardContainer;
