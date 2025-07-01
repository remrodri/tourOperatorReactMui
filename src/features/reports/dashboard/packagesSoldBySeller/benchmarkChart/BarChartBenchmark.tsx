import React, { useEffect, useState } from "react";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip"; // Or wherever you pasted Tooltip.tsx
import { useDashboardContext } from "../../../context/DashboardContext";
import { Box, Typography } from "@mui/material";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import { useTouristDestinationContext } from "../../../../touristDestination/context/TouristDestinationContext";
import { BookingType } from "../../../../booking/types/BookingType";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";
const data = [
  { key: "Model 0", value: 85.8 },
  { key: "Model A", value: 34.3 },
  { key: "Model B", value: 27.1 },
  { key: "Model C", value: 22.5 },
];

export function BarChartBenchmark() {
  const [data,setData]=useState<any>([])

  const {packagesSoldBySeller}=useDashboardContext();
  const {getTourPackageInfoById}=useTourPackageContext();
  const {getTouristDestinationInfoById}=useTouristDestinationContext();
  const [packagesSoldBySellerWithDestinations,setPackagesSoldBySellerWithDestinations]=useState<any>([])

  const getBookingInfoById = () => {
    const touristDestinationInfos = packagesSoldBySeller.map((d)=>{
      const tourPackageIds = d.bookings.map((booking:BookingType)=>booking.tourPackageId)
      const tourPackageInfos = tourPackageIds.map((tourPackageId:string)=>getTourPackageInfoById(tourPackageId))
      const touristDestinations = tourPackageInfos.map((tourPackage:TourPackageType|null)=>{
        if(tourPackage){
          return getTouristDestinationInfoById(tourPackage.touristDestination)?.name||""
        }
      }).filter((d)=>d!==null)
      // console.log('touristDestinations::: ', touristDestinations);

      const uniqueDestinationNames = [...new Set(touristDestinations)]
      // console.log('uniqueDestinationNames::: ', uniqueDestinationNames);
      const destinationsCounter = uniqueDestinationNames.map((destinationName:any)=>{
        const filteredBookings = touristDestinations.filter((d:any)=>d.includes(destinationName))
        return {name:destinationName,value:filteredBookings.length}
      })
      // console.log('destinationsCounter::: ', destinationsCounter);
      return destinationsCounter
    })
    // console.log('touristDestinationInfos::: ', touristDestinationInfos);
    if(touristDestinationInfos.length===0){
      return setData([])
    }
    const touristDestinationInfosWithDestinations = []
    for (let i = 0; i < packagesSoldBySeller.length; i++) {
      
      touristDestinationInfosWithDestinations.push({...packagesSoldBySeller[i],destinationsCounter:touristDestinationInfos[i]})
      // console.log('touristDestinationInfosWithDestinations::: ', touristDestinationInfosWithDestinations);
    }
    setData(touristDestinationInfosWithDestinations)
  }
  useEffect(() => {
    getBookingInfoById();
  }, [packagesSoldBySeller]);
  return (
    <div className="w-full h-full grid gap-4 py-4">
      {/* Bars */}
      {data.map((d:any, index:any) => {
        return (
          <ClientTooltip key={index}>
            <TooltipTrigger>
              <>
                <div
                  className={`text-sm whitespace-nowrap ${index === 0 ? "bg-lime-500 dark:bg-[#00F2FF] text-transparent bg-clip-text" : "text-gray-500 dark:text-zinc-400"}`}
                >
                  {/* {d.name} */}
                  <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  
                  >
                  <Box
                    sx={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img src={d.img} alt="" width="100%" height="100%" />
                  </Box>
                    <Typography variant="body2">{d.name}</Typography>
                  </Box>
                </div>
                <div className="flex items-center gap-2.5" >
                  <div
                    className="relative rounded-sm h-3 bg-gray-200 dark:bg-zinc-800 overflow-hidden w-full"
                  >
                    <div
                      className={`absolute inset-0 rounded-r-sm bg-gradient-to-r ${index === 0 ? "from-lime-300 to-teal-300 dark:from-[#00F2FF] dark:to-[#7AED5C]" : "from-zinc-400 to-gray-400 dark:from-zinc-500 dark:to-zinc-400"}`}
                      style={{
                        width: `${(d.value / Math.max(...data.map((d:any) => d.value))) * 100}%`,
                      }}
                    />
                  </div>
                  <div
                    className={`text-sm whitespace-nowrap ${index === 0 ? "bg-teal-400 dark:bg-[#7AED5C] text-transparent bg-clip-text" : "text-gray-500 dark:text-zinc-400"} tabular-nums`}
                  >
                    {d.value}
                  </div>
                </div>
              </>
            </TooltipTrigger>
            <TooltipContent>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              >
              <Box
                sx={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img src={d.img} alt="" width="100%" height="100%" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="body2">{d.name}</Typography>
                <Typography variant="body2">Total vendidos: {d.value}</Typography>
                {d.destinationsCounter.map((destination:any,index:any)=>{
                  return <Typography variant="body2" sx={{color:"#B89DFB"}} key={index}>{destination.name}: {destination.value}</Typography>
                })}
              </Box>
              </Box>
            </TooltipContent>
          </ClientTooltip>
        );
      })}
    </div>
  );
}
