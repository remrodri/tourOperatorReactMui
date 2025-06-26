import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";
import { AnimatedBar } from "./AnimatedBar";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

const data = [
  { key: "Technology", value: 38.1, color: "#F5A5DB" },
  { key: "Financials", value: 25.3, color: "#B89DFB" },
  { key: "Energy", value: 23.1, color: "#758bcf" },
  { key: "Cyclical", value: 19.5, color: "#33C2EA" },
  { key: "Defensive", value: 14.7, color: "#FFC182" },
  { key: "Utilities", value: 5.8, color: "#87db72" },
].toSorted((a, b) => b.value - a.value);

export function BarChartAnimated() {
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  const longestWord = max(data.map((d) => d.key.length)) || 1;

  return (
    <div
      className="relative w-full h-72"
      style={
        {
          "--marginTop": "20px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": `${longestWord * 7}px`,
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0 z-10 overflow-hidden
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]"
      >
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();

          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <AnimatedBar
                  children={<span>{d.value}%</span>}
                  index={index}
                  style={{
                    top: `${yScale(d.key)}%`,
                    left: 0,
                    width: `${barWidth}%`,
                    height: `${barHeight}%`,
                    backgroundColor: d.color,
                    borderRadius: "0 6px 6px 0",
                    position: "absolute",
                  }}
                >
                  {/* Empty — styled directly on motion.div */}
                </AnimatedBar>

                <TooltipContent>
                  <div className="flex gap-2.5 items-center">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <div>
                      <div>{d.key}</div>
                      <div className="text-gray-500 text-sm/5">{d.value}%</div>
                    </div>
                  </div>
                </TooltipContent>
              </TooltipTrigger>
            </ClientTooltip>
          );
        })}

        {/* Grid Lines */}
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {xScale
            .ticks(8)
            .map(xScale.tickFormat(8, "d"))
            .map((tick, i) => (
              <g key={i} transform={`translate(${xScale(+tick)},0)`}>
                <line
                  y1={0}
                  y2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                  className="text-gray-300/80 dark:text-gray-800/80"
                />
              </g>
            ))}
        </svg>
      </div>

      {/* Y Axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)] overflow-visible"
      >
        <g className="translate-x-[calc(var(--marginLeft)-8px)]">
          {data.map((entry, i) => (
            <text
              key={i}
              x="0"
              y={`${yScale(entry.key)! + yScale.bandwidth() / 2}%`}
              dy=".35em"
              textAnchor="end"
              fill="currentColor"
              className="text-xs text-zinc-400"
            >
              {entry.key}
            </text>
          ))}
        </g>
      </svg>

      {/* X Axis */}
      <svg
        className="absolute inset-0
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          h-[calc(100%-var(--marginBottom))] translate-y-4 overflow-visible"
      >
        <g className="overflow-visible">
          {xScale.ticks(4).map((value, i) => (
            <text
              key={i}
              x={`${xScale(value)}%`}
              y="100%"
              textAnchor="middle"
              fill="currentColor"
              className="text-xs tabular-nums text-gray-400"
            >
              {value}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
