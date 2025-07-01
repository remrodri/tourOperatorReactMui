import { CSSProperties } from "react";
import { scaleTime, scaleLinear, max, line as d3_line, curveNatural as d3_curveNatural } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip"; // Or wherever you pasted Tooltip.tsx

let sales = [
  { date: "2023-01-01", value: 0 },
  { date: "2023-02-01", value: 0 },
  { date: "2023-03-01", value: 0 },
  { date: "2023-04-01", value: 0 },
  { date: "2023-05-01", value: 0 },
  { date: "2023-06-01", value: 3 },
  { date: "2023-07-01", value: 0 },
  { date: "2023-08-01", value: 0 },
  { date: "2023-09-01", value: 0 },
  { date: "2023-10-01", value: 0 },
  { date: "2023-11-01", value: 0 },
  { date: "2023-12-31", value: 0 },
];
let data = sales.map((d) => ({ ...d, date: new Date(Date.UTC(Number(d.date.split("-")[0]), Number(d.date.split("-")[1]), Number(d.date.split("-")[2]))) }));

export function LineChartPulse() {
  let xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);
  let yScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  let line = d3_line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3_curveNatural);

  let d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="relative h-72 w-full"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* Y axis */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {yScale
          .ticks(8)
          .map(yScale.tickFormat(8, "d"))
          .map((value, i) => (
            <div
              key={i}
              style={{
                top: `${yScale(+value)}%`,
                left: "0%",
              }}
              className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
            >
              {value}
            </div>
          ))}
      </div>

      {/* Chart area */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {/* Pulsating dot */}
        <div
          className="absolute size-2"
          style={{
            left: `${xScale(data[data.length - 1].date)}%`,
            top: `${yScale(data[data.length - 1].value)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="animate-ping w-full h-full rounded-full bg-white dark:bg-pink-500 border-2 border-pink-400" />
        </div>
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className="text-zinc-300 dark:text-zinc-700"
                key={i}
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
          {/* Line */}
          <path
            d={d}
            fill="none"
            stroke="url(#linePulse-gradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="linePulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" className="text-purple-500" />
              <stop offset="100%" stopColor="currentColor" className="text-pink-400" />
            </linearGradient>
          </defs>

          {/* Circles and Tooltips */}
          {data.map((d, index) => (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <g className="group/tooltip">
                  {/* Tooltip Line */}
                  <line
                    x1={xScale(d.date)}
                    y1={0}
                    x2={xScale(d.date)}
                    y2={100}
                    stroke="currentColor"
                    strokeWidth={1}
                    className="opacity-0 group-hover/tooltip:opacity-100 text-zinc-300 dark:text-zinc-700 transition-opacity"
                    vectorEffect="non-scaling-stroke"
                    style={{ pointerEvents: "none" }}
                  />
                  {/* Invisible area closest to a specific point for the tooltip trigger */}
                  <rect
                    x={(() => {
                      const prevX = index > 0 ? xScale(data[index - 1].date) : xScale(d.date);
                      return (prevX + xScale(d.date)) / 2;
                    })()}
                    y={0}
                    width={(() => {
                      const prevX = index > 0 ? xScale(data[index - 1].date) : xScale(d.date);
                      const nextX =
                        index < data.length - 1 ? xScale(data[index + 1].date) : xScale(d.date);
                      const leftBound = (prevX + xScale(d.date)) / 2;
                      const rightBound = (xScale(d.date) + nextX) / 2;
                      return rightBound - leftBound;
                    })()}
                    height={100}
                    fill="transparent"
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  {d.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </div>
                <div className="text-gray-500 text-sm">{d.value.toLocaleString("en-US")}</div>
              </TooltipContent>
            </ClientTooltip>
          ))}
        </svg>

        <div className="translate-y-2">
          {/* X Axis */}
          {data.map((day, i) => {
            const isFirst = i === 0;
            const isLast = i === data.length - 1;
            const isMax = day.value === Math.max(...data.map((d) => d.value));
            if (!isFirst && !isLast && !isMax) return null;
            return (
              <div key={i} className="overflow-visible text-zinc-500">
                <div
                  style={{
                    left: `${xScale(day.date)}%`,
                    top: "100%",
                    transform: `translateX(${i === 0 ? "0%" : i === data.length - 1 ? "-100%" : "-50%"})`, // The first and last labels should be within the chart area
                  }}
                  className="text-xs absolute"
                >
                  {day.date.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
