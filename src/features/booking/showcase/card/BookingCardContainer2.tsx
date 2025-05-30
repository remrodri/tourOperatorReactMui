import { useEffect, useState } from "react";
import { BookingType } from "../../types/BookingType";
import BookingCard2 from "./BookingCard2";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { usePaymentContext } from "../../../payment/context/PaymentContext";
import { useUserContext } from "../../../userManagement/context/UserContext";
import { User } from "../../../userManagement/types/User";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../types/TouristType";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import MoreInfoDialogContainer from "../../moreInfoDialog/MoreInfoDialogContainer";
import MoreInfoDialogContainer2 from "../../moreInfoDialog/MoreInfoDialogContainer2";
import BookingFormContainer2 from "../../bookingForm/BookingFormContainer2";

interface BookingCardContainer2Props {
    booking: BookingType;
    index: number;
    // open: boolean;
    // handleClick: () => void;
}
const BookingCardContainer2: React.FC<BookingCardContainer2Props> = ({
  booking,
  index,
  // open,
  // handleClick,
}) => {
  console.log('booking::: ', booking);
  const {getTourPackageInfoById}=useTourPackageContext()
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const {getTotalPaid}=usePaymentContext();
  const {getTouristById}=useTouristContext();
  const [mainTouristInfo, setMainTouristInfo] = useState<TouristType | null>(null);
  const [tpInfo, setTpInfo] = useState<TourPackageType | null>(null);
  const [openEditForm,setOpenEditForm]=useState(false);

  const handleOpenEditForm=()=>{
    setOpenEditForm(true);
  }

  const handleCloseEditForm=()=>{
    setOpenEditForm(false);
  }

  const handleMenuOptions = (option: string) => {
      switch (option) {
        case "Ver detalles":
          // handleOpenMoreInfoClick();
          handleOpenInfo();
          break;
        case "Editar":
          console.log("Editar::: ");
          handleOpenEditForm();
          break;
        case "Registrar pago":
          console.log("pagar::: ");
          break;
        default:
          console.log("Opcion invalida");
          break;
      }
    };
    const handleOpenInfo = () => {
      setOpenMoreInfo(true);
    };
    const handleCloseInfo = () => {
      setOpenMoreInfo(false);
    };
    const [totalPaid, setTotalPaid] = useState(0);
    const loadTotalPaid = (): void => {
      const totalPaid = getTotalPaid(booking?.paymentIds || []);
      setTotalPaid(totalPaid);
    };
    useEffect(() => {
      // if(!booking){
      //   return;
      // }
      loadTotalPaid();
      getMainTouristInfo(booking?.mainTouristId ?? "")
      getTourPackageInfo(booking?.tourPackageId ?? "")
      }, [booking]);

      const getTourPackageInfo =(id: string) => {
        if (!id) {
          console.warn("tourPackage called without id");
          return null;
        }
        const tp = getTourPackageInfoById(id);
        if (!tp) {
          console.warn("tourPackage not found");
          return null;
        }
        setTpInfo(tp);
        // return tp;
      }

    const getMainTouristInfo =(id: string) => {
      if (!id) {
        console.warn("tourPackage called without id");
        return null;
      }
      const tourist = getTouristById(id);
      if (!tourist) {
        console.warn("tourPackage not found");
        return null;
      }
      setMainTouristInfo(tourist);
      // return tp;
    }

    const getBalance = (): number => {
      const totalPrice = booking?.totalPrice || 0;
      const balance = totalPrice - totalPaid;
      return Number(balance.toFixed(2));
      // return balance;
    };
  return (
    <>
    <BookingCard2
      booking={booking}
      tpInfo={tpInfo}
      index={index}
      // open={openEditForm}
      // handleClose={handleCloseEditForm}
      handleMenuOptions={handleMenuOptions}
      balance={Number(getBalance())}
      mainTouristInfo={mainTouristInfo}
    />
    {openMoreInfo && (
      <MoreInfoDialogContainer2
      open={openMoreInfo}
      handleClose={handleCloseInfo}
      booking={booking}
      balance={Number(getBalance())}
      />
    )}
    {openEditForm && (
      <BookingFormContainer2
      open={openEditForm}
      handleClick={handleCloseEditForm}
      booking={booking}
      />
    )}
    </>
  );
};
export default BookingCardContainer2;