import { Box, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { BarChartAnimated } from "./animatedBarChart/BarChartAnimated";
import { BarChartBenchmark } from "./benchmarkChart/BarChartBenchmark";
import { AnimatedDonutChart } from "./pieChart/AnimatedDonutChart";
import { BarChartThinBreakdown } from "./thinBreakdownBarChart/BarChartThinBreakdown";
import BarChartMultiVertical from "./totalSalesbyDate/multiVerticalBarChart/BarChartMultiVertical";
import TotalSalesByDateContainer from "./totalSalesbyDate/TotalSalesByDateContainer";
import { BookingType } from "../../booking/types/BookingType";
import TotalSalesByYearContainer from "./totalSalesByYear/TotalSalesByYearContainer";
import PackagesSoldBySellerContainer from "./packagesSoldBySeller/PackagesSoldBySellerContainer";
import { LineChartPulse } from "./LineChartPulse/LineChartPulse";
import { LineChart } from "./lineChart/LineChart";
import CumulativeBookingTrendContainer from './cumulativeBookingTrend/CumulativeBookingTrendContainer';
import GuideRankingByDestination from "./GuideRankingByDestination/GuideRankingByDestination";
import GuideRankingByDestinationContainer from "./GuideRankingByDestination/GuideRankingByDestinationContainer";
import GlobalStatsContainer from "./globalStats/GlobalStatsContainer";

interface DashboardProps {
    // bookings: BookingType[];
    // touristDestinationWithBookings: any[];
}
const Dashboard: React.FC<DashboardProps> = ({
  // bookings,
  // touristDestinationWithBookings
}) => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography 
            variant="h4"
            sx={{
                height: "5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: "0 0 0 1.5rem",
            }}
            >
              <BreadCrumbsContainer />
              <Box
                sx={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                Dashboard
              </Box>
            </Typography>
            <Box
                sx={{
                  height: "calc(100% - 5rem)",
                  display: "flex",
                  // p: "20px",
                }}
              >
                <Box
                sx={{
                    // pt: "30px",
              // p:"0px 10px 10px 0px",
                  p:"20px",
                    flexGrow: 1,
                    // display: "flex",
                    // justifyContent: "center",
                    // flexWrap: "wrap",
                    overflowY: "auto",
                    // gap: "1rem",
                    // alignContent: "flex-start",
                    // background: "rgba(255, 255, 255, 0.2)",
                    // borderRadius: "10px",
                    // boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
                    // backdropFilter: "blur(10px)",
                    // border: "1px solid rgba(255, 255, 255, 0.2)",
                    // background: "rgba(255, 255, 255, 0.2)",
                    // borderRadius: "10px",
                    // boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
                    // // backdropFilter: "blur(10px)",
                    // border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gridTemplateRows: "1fr 1fr 1fr 1fr",
              gap: "10px 10px",
                    
                }}
                >
                  <Box
                  sx={{
                    gridColumn: "1 /5",
                    gridRow: "1 / 2",
                  }}
                  >
                  <GlobalStatsContainer/>
                  </Box>
                  <Box
                    sx={{
                      gridColumn: "3 / 5",
                      gridRow: "3 / 4",
                      background: "rgba(14, 18, 20, 0.6)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      // backdropFilter: "blur(5px)",
                      border: "1px solid rgba(14, 18, 20, 0.7)",
                      
                    }}
                  >
                    {/* <AnimatedDonutChart /> */}
                    <TotalSalesByYearContainer />
                  </Box>
                  {/* <Box
                    sx={{
                      gridColumn: "1 / 3",
                      gridRow: "1 / 2",
                      background: "rgba(0, 0, 0, 0.41)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
                      // backdropFilter: "blur(5px)",
                      border: "1px solid rgba(0, 0, 0, 0.51)",
                      p:"1rem",
                      display:"flex",
                      gap:"1rem",
                      flexDirection:"column",
                    }}
                  >
                    <Box
                    sx={{
                      height:"5rem",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "5px",
                      // boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
                      // backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    >
                      <Typography variant="h6">Reservas</Typography>
                    </Box>
                    <BarChartMultiVertical />
                  </Box> */}
                  <Box
                  sx={{
                    gridColumn: "1 / 5",
                    gridRow: "2 / 3",
                  }}
                  >
                  <TotalSalesByDateContainer 
                  // bookings={bookings} 
                  // touristDestinationWithBookings={touristDestinationWithBookings}
                  />

                  </Box>
                  <Box
                    sx={{
                      gridColumn: "1 / 3",
                      gridRow: "3 / 4",
                      background: "rgba(14, 18, 20, 0.6)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      // backdropFilter: "blur(5px)",
                      border: "1px solid rgba(14, 18, 20, 0.7)",
                    }}
                  >
                    {/* <BarChartAnimated /> */}
                    <PackagesSoldBySellerContainer/>
                  </Box>
                  <Box
                    sx={{
                      gridColumn: "1 / 3",
                      gridRow: "4 / 5",
                      background: "rgba(14, 18, 20, 0.6)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      // backdropFilter: "blur(5px)",
                      border: "1px solid rgba(14, 18, 20, 0.7)",
                    }}
                  >
                    {/* <BarChartBenchmark /> */}
                    {/* <BarChartAnimated />
                    <LineChartPulse/>
                    <LineChart/> */}
                    <CumulativeBookingTrendContainer/>
                  </Box>
                  <Box
                    sx={{
                      gridColumn: "3 / 5",
                      gridRow: "4 / 5",
                      background: "rgba(14, 18, 20, 0.6)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      // backdropFilter: "blur(5px)",
                      border: "1px solid rgba(14, 18, 20, 0.7)",
                    }}
                  >
                    {/* <BarChartThinBreakdown />
                    <BarChartThinBreakdown />
                    <BarChartThinBreakdown />
                    <BarChartThinBreakdown /> */}
                    <GuideRankingByDestinationContainer/>
                  </Box>
                </Box>
                
            </Box>
        </Box>
    );
};
export default Dashboard;
