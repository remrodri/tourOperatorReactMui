import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BarChartThinBreakdown from "../dashboard/GuideRankingByDestination/thinBreakdownBarChart/BarChartThinBreakdown";
import { BarChartBenchmark } from "../dashboard/packagesSoldBySeller/benchmarkChart/BarChartBenchmark";
import LineChartPulse from "../dashboard/cumulativeBookingTrend/LineChartPulse/LineChartPulse";

vi.mock("../context/DashboardContext", () => ({
  useDashboardContext: () => ({
    packagesSoldBySeller: [
      {
        name: "María Fernanda",
        value: 12,
        img: "/uploads/maria.jpg",
        tourPackageCounts: [],
      },
    ],
  }),
}));

vi.mock("../../tourPackage/context/TourPackageContext", () => ({
  useTourPackageContext: () => ({ getTourPackageInfoById: vi.fn() }),
}));

vi.mock("../../touristDestination/context/TouristDestinationContext", () => ({
  useTouristDestinationContext: () => ({
    getTouristDestinationInfoById: vi.fn(),
  }),
}));

const showTooltip = (element: Element) => {
  fireEvent.pointerMove(element, {
    pointerType: "mouse",
    clientX: 200,
    clientY: 120,
  });
};

describe("Ayudas de los gráficos de Reportes", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("muestra el rostro del vendedor en la ayuda de paquetes vendidos", async () => {
    render(<BarChartBenchmark />);

    const sellerName = screen.getByText("María Fernanda");
    const trigger = sellerName.parentElement?.parentElement?.parentElement;
    expect(trigger).not.toBeNull();
    showTooltip(trigger!);

    expect(
      await screen.findByAltText("Fotografía de María Fernanda"),
    ).toHaveAttribute("src", expect.stringContaining("/uploads/maria.jpg"));
    expect(screen.getByText("Total vendidos: 12")).toBeInTheDocument();
  });

  it("limita el nombre visible y muestra imagen y nombre completo del destino", async () => {
    render(
      <BarChartThinBreakdown
        data={{
          guideId: "guide-1",
          guideName: "Valeria López Chávez",
          destinations: [
            {
              destinationName: "Cañón de Tuta Wallpa",
              destinationImage: "/uploads/tuta-wallpa.jpg",
              count: 56,
            },
          ],
        }}
      />,
    );

    const destinationLabel = screen.getByText("Cañón de Tuta Wallpa");
    expect(destinationLabel).toHaveStyle({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    });
    showTooltip(destinationLabel.parentElement?.parentElement ?? destinationLabel);

    expect(
      await screen.findByAltText("Imagen de Cañón de Tuta Wallpa"),
    ).toHaveAttribute("src", expect.stringContaining("/uploads/tuta-wallpa.jpg"));
    expect(screen.getByText("Cantidad de viajes: 56")).toBeInTheDocument();
  });

  it("muestra fecha y cantidad de reservas en la tendencia", async () => {
    const { container } = render(
      <LineChartPulse
        cumulativeBookings={[
          { date: "2026-01-02", value: 3 },
          { date: "2026-01-03", value: 5 },
        ]}
      />,
    );

    const transparentArea = container.querySelector('rect[fill="transparent"]');
    expect(transparentArea).not.toBeNull();
    showTooltip(transparentArea!.parentElement?.parentElement ?? transparentArea!);

    expect(await screen.findByText("Reservas registradas: 3")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
