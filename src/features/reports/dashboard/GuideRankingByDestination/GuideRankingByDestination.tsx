import { Box, Typography } from "@mui/material"
import BarChartThinBreakdown from "./thinBreakdownBarChart/BarChartThinBreakdown"
import { GuideStatsType } from "../../context/DashboardContext"

interface GuideRankingByDestinationProps {
    guidesStats:GuideStatsType[]
    loading:boolean
}
const GuideRankingByDestination:React.FC<GuideRankingByDestinationProps> = ({guidesStats,loading}) => {
  console.log('guidesStats::: ', guidesStats);
  if(loading){
    return <div>Loading...</div>
  }
    return (
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        gap: "1rem",
        p:"1rem",
      }}
      >
        <Typography variant="h6">Experiencia de guias por destino</Typography>
        <Box>
          {guidesStats.map((guideStat:GuideStatsType,index:number)=>{
            return (
              <Box
              key={guideStat.guideId}
              sx={{
                display: "flex",
                flexDirection: "column",
                // gap: "1rem",
              }}
              >
                <Typography variant="body2">{index+1}. {guideStat.guideName}</Typography>
                <BarChartThinBreakdown data={guideStat}/>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
}
export default GuideRankingByDestination
