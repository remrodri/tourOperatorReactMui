import React, { CSSProperties, useEffect, useState } from "react";
import {
  GuideStatsType,
  useDashboardContext,
} from "../../../context/DashboardContext";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { Avatar } from "@mui/material";

// const data = [
//   {
//     key: "Tech",
//     value: 17.1,
//     color: "from-fuchsia-300/80 to-fuchsia-400/80 dark:from-fuchsia-500 dark:to-fuchsia-700",
//   },
//   {
//     key: "Utilities",
//     value: 14.3,
//     color: "from-violet-300 to-violet-400 dark:from-violet-500 dark:to-violet-700",
//   },
//   {
//     key: "Energy",
//     value: 27.1,
//     color: "from-blue-300 to-blue-400 dark:from-blue-500 dark:to-blue-700",
//   },
//   {
//     key: "Cyclicals",
//     value: 42.5,
//     color: "from-sky-300 to-sky-400 dark:from-sky-500 dark:to-sky-700",
//   },
//   {
//     key: "Fuel",
//     value: 12.7,
//     color: "from-orange-200 to-orange-300 dark:from-amber-500 dark:to-amber-700",
//   },
// ];
const colors = [
  {
    destinationName: "Incachaca",
    color:
      "from-fuchsia-300/80 to-fuchsia-400/80 dark:from-fuchsia-500 dark:to-fuchsia-700",
  },
  {
    destinationName: "Salar de Uyuni",
    color:
      "from-violet-300 to-violet-400 dark:from-violet-500 dark:to-violet-700",
  },
  {
    destinationName: "Toro Toro",
    color: "from-blue-300 to-blue-400 dark:from-blue-500 dark:to-blue-700",
  },
  {
    destinationName: "Villa Tunari",
    color: "from-sky-300 to-sky-400 dark:from-sky-500 dark:to-sky-700",
  },
  {
    destinationName: "Incallajta",
    color:
      "from-orange-200 to-orange-300 dark:from-amber-500 dark:to-amber-700",
  },
];

interface BarChartThinBreakdownProps {
  // data:{destinationName:string,count:number}[]
  data: GuideStatsType;
}

const BarChartThinBreakdown: React.FC<BarChartThinBreakdownProps> = ({
  data,
}) => {
  // console.log("data::: ", data);
  const [newData, setNewData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addColorToData = (data: GuideStatsType) => {
    const newData: any = [];
    const destinationswithColor = data.destinations;
    for (const destination of destinationswithColor) {
      const newDataElement = {
        key: destination.destinationName,
        value: destination.count,
        color: colors.find(
          (color) => color.destinationName === destination.destinationName
        )?.color,
        img: data.guideImage,
      };
      newData.push(newDataElement);
    }
    setNewData([...newData]);
  };

  useEffect(() => {
    if (!data) {
      setLoading(true);
      return;
    }
    setLoading(false);
    addColorToData(data);
  }, [data]);
  // console.log("newData::: ", newData);
  const gap = 0.3; // gap between bars
  const totalValue = newData.reduce((acc: any, d: any) => acc + d.value, 0);
  const barHeight = 12;
  const totalWidth = totalValue + gap * (newData.length - 1);
  let cumulativeWidth = 0;

  const cornerRadius = 4; // Adjust this value to change the roundness

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="relative h-[var(--height)] mt-1 mb-6"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "0px",
          "--marginBottom": "0px",
          "--marginLeft": "0px",
          "--height": `${barHeight}px`,
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0 
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {/* Bars with Gradient Fill */}
        {newData.map((d: any, index: any) => {
          const barWidth = (d.value / totalWidth) * 100;
          const xPosition = cumulativeWidth;
          cumulativeWidth += barWidth + gap;

          return (
            <div key={index}>
              <ClientTooltip>
                <TooltipTrigger>
                  <div
                    className="relative"
                    style={{
                      width: `${barWidth}%`,
                      height: `${barHeight}px`,
                      left: `${xPosition}%`,
                      position: "absolute",
                    }}
                  >
                    <div
                      className={`bg-gradient-to-b ${d.color}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: `${cornerRadius}px`,
                      }}
                    />
                    <div
                      className="text-xs text-white text-center"
                      style={{
                        left: `${xPosition + barWidth / 2}%`,
                        top: `${barHeight + 18}px`,
                      }}
                    >
                      {d.key}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Avatar src={d.img} />
                    {d.key}
                  </div>
                  <div className="text-gray-500 dark:text-zinc-400 text-sm">
                    Cantidad de viajes: {d.value}
                  </div>
                </TooltipContent>
              </ClientTooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BarChartThinBreakdown;
