import MoreInfoDialog2 from "./MoreInfoDialog2";
import { BookingType } from "../types/BookingType";
import { useEffect } from "react";

interface MoreInfoDialogContainer2Props {
  open: boolean;
  handleClose: () => void;
  booking: BookingType;
  balance: number;
}

const MoreInfoDialogContainer2: React.FC<MoreInfoDialogContainer2Props> = ({
  open,
  handleClose,
  booking,
  balance,
  
}) => {
  useEffect(()=>{
    console.log('MoreInfoDialogContainer2::: ', booking);
  },[])
  return (
    <MoreInfoDialog2 open={open} handleClose={handleClose}/>
  );
};

export default MoreInfoDialogContainer2
