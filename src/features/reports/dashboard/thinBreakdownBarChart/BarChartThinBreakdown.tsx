import { CSSProperties, useMemo } from "react";

const data = [
  {
    key: "Tech",
    value: 17.1,
    color:
      "from-fuchsia-300/80 to-fuchsia-400/80 dark:from-fuchsia-500 dark:to-fuchsia-700",
  },
  {
    key: "Utilities",
    value: 14.3,
    color:
      "from-violet-300 to-violet-400 dark:from-violet-500 dark:to-violet-700",
  },
  {
    key: "Energy",
    value: 27.1,
    color: "from-blue-300 to-blue-400 dark:from-blue-500 dark:to-blue-700",
  },
  {
    key: "Cyclicals",
    value: 42.5,
    color: "from-sky-300 to-sky-400 dark:from-sky-500 dark:to-sky-700",
  },
  {
    key: "Fuel",
    value: 12.7,
    color:
      "from-orange-200 to-orange-300 dark:from-amber-500 dark:to-amber-700",
  },
];

type Item = (typeof data)[number];
type Bar = Item & { widthPct: number; xPct: number };

export function BarChartThinBreakdown() {
  const gapPct = 0.3; // gap entre barras en %
  const barHeight = 12;
  const cornerRadius = 4;

  const totalValue = useMemo(
    () => data.reduce((acc, d) => acc + d.value, 0),
    [],
  );
  const totalGap = gapPct * (data.length - 1);

  // ✅ Precalcular posiciones SIN mutar durante render
  const bars = useMemo<Bar[]>(() => {
    if (totalValue <= 0) return [];

    // totalWidth "virtual" = suma de valores + gaps (en las mismas "unidades" de %)
    const totalWidth = totalValue + totalGap;

    return data.reduce<Bar[]>((acc, d) => {
      const widthPct = (d.value / totalWidth) * 100;
      const prev = acc[acc.length - 1];
      const xPct = prev ? prev.xPct + prev.widthPct + gapPct : 0;

      acc.push({ ...d, widthPct, xPct });
      return acc;
    }, []);
  }, [totalValue, totalGap, gapPct]);

  return (
    <div
      className="relative h-[var(--height)] mt-4 mb-8"
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
        {bars.map((d, index) => (
          <div
            key={d.key ?? index}
            className="relative"
            style={{
              width: `${d.widthPct}%`,
              height: `${barHeight}px`,
              left: `${d.xPct}%`,
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

            {/* ✅ Label centrado respecto a la barra (no al contenedor) */}
            <div
              className="text-xs text-gray-400 text-center"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: `${barHeight + 18}px`,
                whiteSpace: "nowrap",
              }}
            >
              {d.key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
