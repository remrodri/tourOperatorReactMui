import { useBookingContext2 } from "../../booking/context/BookingContext2";
import Dashboard from "./Dashboard";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useEffect, useState } from "react";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { DashboardProvider, useDashboardContext } from "../context/DashboardContext";
const DashboardContainer: React.FC = () => {
    // const {bookings}=useBookingContext2()
    // const {touristDestinations}=useTouristDestinationContext();
    // const {tourPackages}=useTourPackageContext();
    // const [touristDestinationWithBookings,setTouristDestinationWithBookings]=useState<any>([])
    // const {touristDestinationWithBookings,bookings}=useDashboardContext()
    
    // const getTourPackageById = (id:string) => {
    //     const tourPackage = tourPackages.find((tourPackage) => tourPackage.id === id)
    //     return tourPackage
    // }
    
    // const getTouristDestinationWithBookings = () => {
    //     // console.log('bookings::: ', bookings);
    //     const touristDestinationWithBookings 
    //     = touristDestinations.map((touristDestination) => {
    //         const filteredBookings = bookings.filter((booking) => { 
    //             const tourPackage = getTourPackageById(booking.tourPackageId)
    //             return tourPackage?.touristDestination === touristDestination.id
    //         })
    //         return { ...touristDestination, filteredBookings };
    //     });
    //     setTouristDestinationWithBookings(touristDestinationWithBookings);
    // }

    // useEffect(() => {
    //     getTouristDestinationWithBookings();
    // }, [bookings]);

    // console.log('touristDestinations::: ', touristDestinations);
    // const touristDestinationsCounted = touristDestinations.length;
    // console.log('touristDestinationsCounted::: ', touristDestinationsCounted);
    return (
        
        <Dashboard 
        // bookings={bookings}
        // touristDestinationWithBookings={touristDestinationWithBookings}
        />
    )
}
export default DashboardContainer;