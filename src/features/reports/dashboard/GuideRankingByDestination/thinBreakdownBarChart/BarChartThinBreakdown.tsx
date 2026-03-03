import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { GuideStatsType } from "../../../context/DashboardContext";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { Avatar, Box } from "@mui/material";

const colorPalette = [
  "from-fuchsia-400 to-fuchsia-600",
  "from-orange-400 to-orange-600",
  "from-blue-400 to-blue-600",
  "from-violet-400 to-violet-600",
  "from-sky-400 to-sky-600",
  "from-green-400 to-green-600",
  "from-red-400 to-red-600",
  "from-pink-400 to-pink-600",
  "from-teal-400 to-teal-600",
  "from-indigo-400 to-indigo-600",
];

interface BarChartThinBreakdownProps {
  data: GuideStatsType;
}

type ThinBarItem = {
  key: string;
  value: number;
  color: string;
  img: string;
};

const BarChartThinBreakdown: React.FC<BarChartThinBreakdownProps> = ({
  data,
}) => {
  const [newData, setNewData] = useState<ThinBarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addColorToData = (incoming: GuideStatsType) => {
    const updated: ThinBarItem[] = incoming.destinations.map(
      (destination, index) => {
        const color = colorPalette[index % colorPalette.length];
        return {
          key: destination.destinationName,
          value: destination.count,
          color,
          img: incoming.guideImage,
        };
      },
    );
    setNewData(updated);
  };

  useEffect(() => {
    if (!data) {
      setLoading(true);
      return;
    }
    setLoading(false);
    addColorToData(data);
  }, [data]);

  const barHeight = 12;
  const cornerRadius = 4;

  const totalValue = useMemo(
    () => newData.reduce((acc, d) => acc + d.value, 0),
    [newData],
  );

  // ✅ Precalculamos width y x sin mutar variables durante el render
  const bars = useMemo(() => {
    if (totalValue <= 0) return [];

    type BarComputed = ThinBarItem & { width: number; x: number };

    return newData.reduce<BarComputed[]>((acc, d) => {
      const width = (d.value / totalValue) * 100;
      const prev = acc[acc.length - 1];
      const x = prev ? prev.x + prev.width : 0;
      acc.push({ ...d, width, x });
      return acc;
    }, []);
  }, [newData, totalValue]);

  if (loading) return <div>Cargando...</div>;

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
      <div
        className="absolute inset-0 
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {bars.map((d, index) => (
          <Box key={d.key ?? index}>
            <ClientTooltip>
              <TooltipTrigger>
                <div
                  className="relative"
                  style={{
                    width: `calc(${d.width}% - ${index < bars.length - 1 ? 1 : 0}px)`,
                    height: `${barHeight}px`,
                    left: `${d.x}%`,
                    position: "absolute",
                  }}
                >
                  <div
                    className={`bg-gradient-to-b ${d.color}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: `${cornerRadius}px`,
                      marginRight: "4px",
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
        ))}
      </div>
    </div>
  );
};

export default BarChartThinBreakdown;
