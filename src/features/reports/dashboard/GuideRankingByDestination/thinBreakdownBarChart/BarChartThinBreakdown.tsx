import React, { CSSProperties, useEffect, useState } from "react";
import {
  GuideStatsType,
  useDashboardContext,
} from "../../../context/DashboardContext";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { Avatar, Box } from "@mui/material";

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
  maxValue: number;
}

const BarChartThinBreakdown: React.FC<BarChartThinBreakdownProps> = ({
  data,
  maxValue,
}) => {
  // console.log("data::: ", data);
  // console.log('maxValue::: ', maxValue);
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
  // console.log('totalWidth::: ', totalWidth);
  let cumulativeWidth = 0;

  const cornerRadius = 4; // Adjust this value to change the roundness

  if (loading) {
    return <div>Cargando...</div>;
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
        {newData.map((d: any, index: number) => {
          const barWidth = (d.value / totalValue) * 100; // proporción real
          const xPosition = cumulativeWidth; // se acumula en %

          cumulativeWidth += barWidth; // no sumamos el gap aquí

          return (
            <Box key={index}>
              <ClientTooltip>
                <TooltipTrigger>
                  <div
                    className="relative"
                    style={{
                      width: `calc(${barWidth}% - ${
                        index < newData.length - 1 ? 1 : 0
                      }px)`, // se resta un gap en px
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
                        marginRight: "4px", // el gap real entre barras
                      }}
                    />
                    <div
                      className="text-xs text-white text-center"
                      style={{
                        left: "50%",
                        top: `${barHeight + 5}px`,
                        transform: "translateX(-50%)",
                        position: "absolute",
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
            </Box>
          );
        })}
      </div>
    </div>
  );
};
export default BarChartThinBreakdown;
