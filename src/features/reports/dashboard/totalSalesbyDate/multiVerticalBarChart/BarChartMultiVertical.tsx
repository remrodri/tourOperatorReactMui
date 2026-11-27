/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from "react";
import { max, scaleBand } from "d3";
import { Tooltip } from "@mui/material";
import { useTouristDestinationContext } from "../../../../touristDestination/context/TouristDestinationContext";

const PX_BETWEEN_BARS = 5;
const amountFormat = new Intl.NumberFormat("es-BO", {
  style: "currency",
  currency: "BOB",
  maximumFractionDigits: 2,
});
const compactAmountFormat = new Intl.NumberFormat("es-BO", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const getChartMaximum = (value: number): number => {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
};

export const formatAxisAmount = (value: number): string =>
  value === 0 ? "Bs 0" : `Bs ${compactAmountFormat.format(value)}`;

interface BarChartMultiVerticalProps {
  mountsByMonth: any[];
}

const BarChartMultiVertical: React.FC<BarChartMultiVerticalProps> = ({
  mountsByMonth,
}) => {
  const { touristDestinations } = useTouristDestinationContext();
  if (!mountsByMonth || mountsByMonth.length === 0) return null;

  const data = mountsByMonth;
  const numBars = Array.isArray(data[0]?.counts) ? data[0].counts.length : 0;
  const maxValue = max(data.flatMap((item) => item.counts)) ?? 0;
  const chartMaximum = getChartMaximum(maxValue);
  const xScale = scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 100])
    .padding(0.4);
  const colors = ["#B89DFB", "#e7deff"];

  if (chartMaximum === 0) {
    return (
      <div role="status" className="h-62 w-full flex items-center justify-center text-sm text-gray-300">
        No hay recaudación registrada para el año seleccionado.
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-labelledby="monthly-revenue-chart-description"
      className="relative h-62 w-full grid"
      style={{
        "--marginTop": "10px",
        "--marginRight": "15px",
        "--marginBottom": "36px",
        "--marginLeft": "58px",
      } as CSSProperties}
    >
      <p id="monthly-revenue-chart-description" className="sr-only">
        Recaudación mensual por destino. Escala desde Bs 0 hasta {amountFormat.format(chartMaximum)}. Recorre las barras para consultar cada importe exacto.
      </p>
      <div aria-hidden="true" className="absolute text-xs tabular-nums text-gray-200 text-right" style={{ left: 0, top: 2, width: "52px" }}>
        {formatAxisAmount(chartMaximum)}
      </div>
      <div aria-hidden="true" className="absolute text-xs tabular-nums text-gray-200 text-right" style={{ left: 0, bottom: "34px", width: "52px" }}>
        {formatAxisAmount(0)}
      </div>

      <div className="absolute h-[calc(100%-var(--marginTop)-var(--marginBottom))] w-[calc(100%-var(--marginLeft)-var(--marginRight))] translate-x-[var(--marginLeft)] translate-y-[var(--marginTop)]">
        {[0, 50, 100].map((position) => (
          <div
            aria-hidden="true"
            key={position}
            className="absolute left-0 w-full border-t border-dashed border-gray-300/45"
            style={{ top: `${position}%` }}
          />
        ))}

        {data.map((month) => (
          <div
            key={month.name}
            className="absolute top-0 h-full"
            style={{ left: `${xScale(month.name)}%`, width: `${xScale.bandwidth()}%` }}
          >
            {month.counts.map((count: number, barIndex: number) => {
              const barWidth = (100 - PX_BETWEEN_BARS * (numBars - 1)) / numBars;
              const destination = touristDestinations[barIndex]?.name ?? `Destino ${barIndex + 1}`;
              const exactAmount = amountFormat.format(count);
              return (
                <Tooltip
                  key={`${month.name}-${destination}`}
                  arrow
                  enterDelay={0}
                  enterTouchDelay={0}
                  leaveTouchDelay={5000}
                  title={
                    <div>
                      <div>{month.name}</div>
                      <div>{destination}</div>
                      <div className="text-gray-400">
                        Recaudación: {exactAmount}
                      </div>
                    </div>
                  }
                  slotProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: "4px",
                        px: 1.75,
                        py: 1,
                        fontSize: "0.875rem",
                      },
                    },
                    arrow: { sx: { color: "#18181b" } },
                  }}
                >
                  <button
                    type="button"
                    aria-label={`${month.name}, ${destination}: ${exactAmount}`}
                    className="absolute bottom-0 rounded-t focus:outline-none focus:ring-2 focus:ring-white"
                    style={{
                      left: `${barIndex * (barWidth + PX_BETWEEN_BARS)}%`,
                      width: `${barWidth}%`,
                      height: `${(count / chartMaximum) * 100}%`,
                      minHeight: count > 0 ? "2px" : 0,
                      backgroundColor: colors[barIndex % colors.length],
                      border: "1px solid #a07dff55",
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              );
            })}
            <div aria-hidden="true" className="absolute top-full left-1/2 text-xs text-gray-300 whitespace-nowrap" style={{ transform: "translate(-50%, 8px)" }}>
              {month.name.slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartMultiVertical;
