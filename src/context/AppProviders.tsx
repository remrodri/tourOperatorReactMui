import { ReactNode } from "react";

import { UserProvider } from "../features/userManagement/context/UserContext";
import { RoleProvider } from "../features/Role/context/RoleContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import { CancellationPolicyProvider } from "../features/cancellationPolicy/context/CancellationPolicyContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import { PaymentProvider } from "../features/payment/context/PaymentContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { DashboardProvider } from "../features/reports/context/DashboardContext";
import { GuideProvider2 } from "../features/guide/context/GuideContext";

interface Props {
  children: ReactNode;
}

/**
 * AppProviders: envuelve todos los contextos de la aplicación
 * La jerarquía importa:
 * - Cualquier context que use otro context debe ir **después**
 * - Todos los contextos que usan useNavigate deben estar **dentro de RouterProvider**
 */
export const AppProviders = ({ children }: Props) => {
  return (
    // <DateRangeProvider>
    //   <TouristDestinationProvider>
    //     <CancellationPolicyProvider>
    //       <TourTypeProvider>
    //         <TourPackageProvider>
    //           <TouristProvider>
    //             <BookingProvider>
    //               <UserProvider>
    //                 <RoleProvider>
    //                   <DashboardProvider>
    //                     <PaymentProvider>
    //                     <GuideProvider2>
    { children }
    //                     </GuideProvider2>
    //                     </PaymentProvider>
    //                   </DashboardProvider>
    //                 </RoleProvider>
    //               </UserProvider>
    //             </BookingProvider>
    //           </TouristProvider>
    //         </TourPackageProvider>
    //       </TourTypeProvider>
    //     </CancellationPolicyProvider>
    //   </TouristDestinationProvider>
    // </DateRangeProvider>
  );
};
