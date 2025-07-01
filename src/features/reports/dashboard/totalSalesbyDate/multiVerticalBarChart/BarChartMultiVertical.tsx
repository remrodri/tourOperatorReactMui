import React, { CSSProperties, useEffect, useState } from "react";
import { scaleBand, scaleLinear, max, range } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { useTouristDestinationContext } from "../../../../touristDestination/context/TouristDestinationContext";

const PX_BETWEEN_BARS = 5;

interface BarChartMultiVerticalProps {
  year: string;
  countedBookings: any[];
  mountsByMonth: any[];
}

const BarChartMultiVertical: React.FC<BarChartMultiVerticalProps> = ({
  year,
  countedBookings,
  mountsByMonth,
}) => {
  const { touristDestinations } = useTouristDestinationContext();

  if (!mountsByMonth || mountsByMonth.length === 0) return null;

  const data = mountsByMonth;
  const numBars =
    data.length > 0 && Array.isArray(data[0].counts)
      ? data[0].counts.length
      : 0;

  const [dataToRender, setDataToRender] = useState<any[]>([]);

  const xScale = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, 100])
    .padding(0.4);

  const maxValue = max(data.flatMap((d) => d.counts)) ?? 0;
  const roundedMax = Math.ceil(maxValue / 1000) * 1000;

  const yScale = scaleLinear().domain([0, roundedMax]).range([100, 0]);

  const colors = ["#B89DFB", "#e7deff"];

  useEffect(() => {
    if (mountsByMonth.length > 0) {
      setDataToRender(mountsByMonth);
    }
  }, [mountsByMonth]);

  return (
    <div
      className="relative h-62 w-full grid"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "25px",
          "--marginBottom": "30px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* Y axis */}
      <div
        className="relative
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {range(0, roundedMax + 1000, 1000).map((value, i) => (
          <div
            key={i}
            style={{ top: `${yScale(value)}%` }}
            className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-300 w-full text-right pr-2"
          >
            {value}
          </div>
        ))}
      </div>

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
        <div className="relative w-full h-full">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {range(0, roundedMax + 1000, 1000).map((value, i) => (
              <g
                key={i}
                transform={`translate(0,${yScale(value)})`}
                className="text-gray-300/80 dark:text-white"
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          {/* Bars */}
          {data.map((d, index) => (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <div
                  className="absolute top-0"
                  style={{
                    left: `${xScale(d.name)}%`,
                    width: `${xScale.bandwidth()}%`,
                    height: "100%",
                  }}
                >
                  {d.counts.map((count: number, barIndex: number) => {
                    const barHeight = 100 - yScale(count);
                    const barWidth = (100 - PX_BETWEEN_BARS * (numBars - 1)) / numBars;
                    const barXPosition = barIndex * (barWidth + PX_BETWEEN_BARS);

                    return (
                      <div
                        key={barIndex}
                        className="absolute bottom-0 rounded-t"
                        style={{
                          left: `${barXPosition}%`,
                          width: `${barWidth}%`,
                          height: `${barHeight}%`,
                          backgroundColor: colors[barIndex % colors.length],
                          border: `1px solid #a07dff22`,
                        }}
                      />
                    );
                  })}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-1 mb-1.5">
                  {d.name}
                </div>
                <div className="flex flex-col gap-2">
                  {d.counts.map((count: number, index: number) => (
                    <div key={index} className="flex gap-1.5 items-center text-sm">
                      <div
                        className="h-3.5 w-1 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span>{`${touristDestinations[index]?.name ?? "Destino"} ${count}`}</span>
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </ClientTooltip>
          ))}

          {/* X Axis (Labels) */}
          {data.map((entry, i) => {
            const xPosition = xScale(entry.name)! + xScale.bandwidth() / 2;

            return (
              <div
                key={i}
                className="absolute overflow-visible text-gray-400"
                style={{
                  left: `${xPosition}%`,
                  top: "100%",
                  transform: "rotate(45deg) translateX(4px) translateY(8px)",
                }}
              >
                <div className="absolute text-xs -translate-y-1/2 whitespace-nowrap">
                  {entry.name.slice(0, 10) + (entry.name.length > 10 ? "..." : "")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarChartMultiVertical;
