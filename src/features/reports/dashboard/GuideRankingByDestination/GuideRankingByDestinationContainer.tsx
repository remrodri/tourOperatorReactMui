import GuideRankingByDestination from "./GuideRankingByDestination";
import { useDashboardContext } from "../../context/DashboardContext";
import { useEffect, useState } from "react";

const GuideRankingByDestinationContainer = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { guidesStats } = useDashboardContext();

  // en GuideRankingByDestination
  const maxValue = Math.max(
    ...guidesStats.flatMap((g) => g.destinations.map((d) => d.count))
  );

  

  //     useEffect(()=>{
  //         if(!guidesStats){
  //             setLoading(true)
  //             return
  //           // const newData = guideStats.map((guideStat:GuideStatsType)=>{
  //           //   return {
  //           //     key:guideStat.guideName,
  //           //     value:guideStat.destinations.reduce((acc, d) => acc + d.count, 0),
  //           //     color:guideStat.guideImage
  //           //   }
  //           // })
  //         }
  //         setData(guidesStats)
  //         setLoading(false)
  //     },[guidesStats])
  // console.log('guidesStats::: ', guidesStats);
  // console.log('data::: ', data);
  return (
    <GuideRankingByDestination guidesStats={guidesStats} loading={loading} maxValue={maxValue}/>
  );
};
export default GuideRankingByDestinationContainer;
