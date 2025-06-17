import { useEffect, useState } from "react";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { BookingType } from "../../types/BookingType";
import BookingCard from "./BookingCard";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../types/TouristType";
import MoreInfoDialogContainer2 from "../../moreInfoDialog/MoreInfoDialogContainer2";
import BookingFormContainer from "../../bookingForm2/BookingFormContainer";

interface BookingCardContainerProps{
    booking:BookingType;
    index:number;
}
const BookingCardContainer:React.FC<BookingCardContainerProps>=({booking,index})=>{
  const {getTourPackageInfoById}=useTourPackageContext()
  const {getTouristInfoById,tourists}=useTouristContext()
  const [openMoreInfo,setOpenMoreInfo]=useState(false);
  const [tpInfo,setTpInfo]=useState<TourPackageType | null>(null);
  const [mainTouristInfo,setMainTouristInfo]=useState<TouristType | null>(null);
  const [balance,setBalance]=useState(0);
  const [openEditForm,setOpenEditForm]=useState(false);
  const [openPaymentForm,setOpenPaymentForm]=useState(false);

  // console.log('booking::: ', booking);

  const loadTourPackageInfo=()=>{
    if(!booking){
      return;
    }
    const tp=getTourPackageInfoById(booking.tourPackageId);
    if(!tp){
      return;
    }
    setTpInfo(tp);
  }

  const loadMainTouristInfo=()=>{
    if(!booking){
      return;
    }
    if(!booking.tourists || booking.tourists.length === 0){
      return;
    }
    const touristId=booking.tourists[0];
    const tourist=getTouristInfoById(touristId);
    if(!tourist){
      return;
    }
    setMainTouristInfo(tourist);
  }



  const handleOpenMoreInfoClick=()=>{
    setOpenMoreInfo(true);
  }

  const handleCloseMoreInfoClick=()=>{
    setOpenMoreInfo(false);
  }

  const handleOpenEditForm=()=>{
    setOpenEditForm(true);
  }

  const handleCloseEditForm=()=>{
    setOpenEditForm(false);
  }

  const handleOpenPaymentForm=()=>{
    setOpenPaymentForm(true);
  }

  const handleClosePaymentForm=()=>{
    setOpenPaymentForm(false);
  }

  const handleMenuOptions=(option:string)=>{
    switch (option) {
      case "Ver detalles":
        handleOpenMoreInfoClick();
        break;
      case "Editar":
        handleOpenEditForm();
        break;
      case "Registrar pago":
        handleOpenPaymentForm();
        break;
      default:
        console.log("Opcion invalida");
        break;
    }
  }

  const loadBalance=()=>{
    if(!booking){
      return;
    }
    // const totalPaid=getTotalPaid(booking.paymentIds);
    // const balance=booking.totalPrice-totalPaid;
    // setBalance(balance);
    setBalance(booking.totalPrice);
  }

  useEffect(()=>{
    loadTourPackageInfo();
    loadMainTouristInfo();
    loadBalance();
  },[booking,tourists]);

    return(
      <>  
        <BookingCard 
        booking={booking} 
        index={index}
        tpInfo={tpInfo}
        mainTouristInfo={mainTouristInfo}
        balance={balance}
        handleMenuOptions={handleMenuOptions}
        />
        {openMoreInfo && (
          <MoreInfoDialogContainer2
          open={openMoreInfo}
          handleClose={handleCloseMoreInfoClick}
          booking={booking}
          balance={balance}
          />
        )}
        {openEditForm && (
          <BookingFormContainer
          open={openEditForm}
          handleClose={handleCloseEditForm}
          booking={booking}
          />
        )}
        {/* {openPaymentForm && (
          <PaymentFormContainer
          open={openPaymentForm}
          onClose={handleClosePaymentForm}
          booking={booking}
          />
        )} */}
      </>
    )
}
export default BookingCardContainer;
