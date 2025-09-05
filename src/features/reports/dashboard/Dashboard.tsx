import { Box, Fade, Typography } from "@mui/material";
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
import CumulativeBookingTrendContainer from "./cumulativeBookingTrend/CumulativeBookingTrendContainer";
import GuideRankingByDestination from "./GuideRankingByDestination/GuideRankingByDestination";
import GuideRankingByDestinationContainer from "./GuideRankingByDestination/GuideRankingByDestinationContainer";
import GlobalStatsContainer from "./globalStats/GlobalStatsContainer";
import TextType from "../../../TextAnimations/TextType/TextType";
import AnimatedContent from "../../../Animations/AnimatedContent/AnimatedContent";

interface DashboardProps {
  // bookings: BookingType[];
  // touristDestinationWithBookings: any[];
}
const Dashboard: React.FC<DashboardProps> = (
  {
    // bookings,
    // touristDestinationWithBookings
  }
) => {
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // overflowY: "auto",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              height: "5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: "0 1.5rem 0 1.5rem",
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
              <TextType
                text={"Reportes"}
                typingSpeed={50}
                pauseDuration={1000}
                showCursor={true}
                cursorCharacter="_"
                deletingSpeed={50}
              />
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            // height: "calc(100% - 5rem)",
            // display: "flex",
            overflowY: "auto",
            // p: "20px",
          }}
        >
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
            // overflowY="auto"
          >
            <Box
              sx={{
                p: "20px",
                flexGrow: 1,
                // overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                // gridTemplateRows: "1fr 1fr 1fr 1fr",
                gap: "10px 10px",
              }}
            >
              <Box
                sx={{
                  gridColumn: "1 / 5",
                  gridRow: "1 / 2",
                  height: "11rem",
                }}
              >
                <GlobalStatsContainer />
              </Box>
              <Box
                sx={{
                  gridColumn: "3 / 5",
                  // gridRow: "3 / 4",
                }}
              >
                {/* <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.3}
              > */}
                <TotalSalesByYearContainer />
                {/* </AnimatedContent> */}
              </Box>
              <Box
                sx={{
                  gridColumn: "1 / 5",
                  gridRow: "2 / 3",
                }}
              >
                {/* <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={true}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.3}
              > */}
                <TotalSalesByDateContainer />
                {/* </AnimatedContent> */}
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
                <PackagesSoldBySellerContainer />
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
                <CumulativeBookingTrendContainer />
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
                <GuideRankingByDestinationContainer />
              </Box>
            </Box>
          </AnimatedContent>
        </Box>
      </Box>
    </Fade>
  );
};
export default Dashboard;
