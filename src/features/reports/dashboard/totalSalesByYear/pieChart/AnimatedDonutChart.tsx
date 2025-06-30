import { pie, arc, PieArcDatum } from "d3";
import { AnimatedSlice } from "./AnimatedSliace";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip"; // Or wherever you pasted Tooltip.tsx
import { useDashboardContext } from "../../../context/DashboardContext";

type Item = { name: string; value: number };
const data: Item[] = [
  { name: "INCACHACA", value: 23 },
  { name: "SALAR DE UYUNI", value: 18 },
  { name: "GOLD", value: 11 },
  { name: "PLTR", value: 9 },
  { name: "ADA", value: 7 },
  { name: "MSFT", value: 3 },
];

interface AnimatedDonutChartProps {
    singleColor?: "purple" | "blue" | "fuchsia" | "yellow";
    countedBookings: any[];
}

const AnimatedDonutChart: React.FC<AnimatedDonutChartProps> = ({
  singleColor,countedBookings
}) => {
  const {bookingsByTouristDestination}=useDashboardContext();
  // console.log('bookingsByTouristDestination::: ', bookingsByTouristDestination);
  // console.log('countedBookings::: ', countedBookings);
  const radius = 420; // Chart base dimensions
  const gap = 0.01; // Gap between slices
  const lightStrokeEffect = 10; // 3d light effect around the slice

  // Pie layout and arc generator
  const pieLayout = pie<Item>()
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  // Adjust innerRadius to create a donut shape
  const innerRadius = radius / 1.625;
  const arcGenerator = arc<PieArcDatum<Item>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(lightStrokeEffect + 2); // Apply rounded corners

  // Create an arc generator for the clip path that matches the outer path of the arc
  const arcClip =
    arc<PieArcDatum<Item>>()
      .innerRadius(innerRadius + lightStrokeEffect / 2)
      .outerRadius(radius)
      .cornerRadius(lightStrokeEffect + 2) || undefined;

  const labelRadius = radius * 0.825;
  const arcLabel = arc<PieArcDatum<Item>>().innerRadius(labelRadius).outerRadius(labelRadius);

  const arcs = pieLayout(bookingsByTouristDestination);

  // Calculate the angle for each slice
  function computeAngle(d: PieArcDatum<Item>) {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  }

  // Minimum angle to display text
  const minAngle = 20; // Adjust this value as needed

  const colors = {
    purple: ["#7e4cfe", "#895cfc", "#956bff", "#a37fff", "#b291fd", "#b597ff"],
    blue: ["#73caee", "#73caeeee", "#73caeedd", "#73caeecc", "#73caeebb", "#73caeeaa"],
    fuchsia: ["#f6a3ef", "#f6a3efee", "#f6a3efdd", "#f6a3efcc", "#f6a3efbb", "#f6a3efaa"],
    yellow: ["#f6e71f", "#f6e71fee", "#f6e71fdd", "#f6e71fcc", "#f6e71fbb", "#f6e71faa"],
  };

  // console.log(arcs);

  return (
    
      
      <div className="relative">
      {/* Add a new div for centered text */}
      <svg
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
        className="max-w-[16rem] mx-auto overflow-visible"
      >
        {/* Sectors with Gradient Fill and Stroke */}
        {arcs.map((d, i) => {
          // console.log(d, "d");
          const angle = computeAngle(d);
          let centroid = arcLabel.centroid(d);
          if (d.endAngle > Math.PI) {
            centroid[0] += 10;
            centroid[1] += 10;
          } else {
            centroid[0] -= 10;
            centroid[1] -= 0;
          }
          return (
            <ClientTooltip key={i}>
            <TooltipTrigger>
            <AnimatedSlice key={i} index={i}>
              <path
                stroke="#ffffff33" // Lighter stroke for a 3D effect
                strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
                fill={singleColor ? colors[singleColor][i] : colors.purple[i]}
                d={arcGenerator(d) || undefined}
              />
              {/* Labels with conditional rendering */}
              <g opacity={angle > minAngle ? 1 : 0}>
                <text 
                  transform={`translate(${centroid})`} 
                  textAnchor="middle" 
                  fontSize={47}
                >
                  <tspan
                  fillOpacity={0.7}
                    y="-0.4em"
                    fontWeight="600"
                    // fill={singleColor === "purple" ? "#eee" : "#444"}
                    fill={singleColor === "purple" ? "#FFFFFF" : "#FFFFFF"}
                  >
                    {d.data.name}
                  </tspan>
                  {angle > minAngle && (
                    <tspan
                    
                      x={0}
                      y="1em"
                      // fillOpacity={0.7}
                      fill={singleColor === "purple" ? "#FFFFFF" : "#FFFFFF"}
                    >
                      {d.data.value.toLocaleString("en-US")}
                    </tspan>
                  )}
                </text>
              </g>
            </AnimatedSlice>
            <TooltipContent>
                <div>{d.data.name}</div>
                <div className="text-gray-500 text-sm">{d.data.value.toLocaleString("en-US")}</div>
              </TooltipContent>
            </TooltipTrigger>
            </ClientTooltip>
            
          );
        })}
      </svg>
    </div>
    
  );
}
export default AnimatedDonutChart;