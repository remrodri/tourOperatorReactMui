import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BarChartMultiVertical, { formatAxisAmount, getChartMaximum } from "./BarChartMultiVertical";

vi.mock("../../../../touristDestination/context/TouristDestinationContext", () => ({
  useTouristDestinationContext: () => ({
    touristDestinations: [{ name: "Incachaca" }, { name: "Uyuni" }],
  }),
}));

describe("BarChartMultiVertical T-1307", () => {
  it("uses a readable maximum and abbreviated axis labels", () => {
    expect(getChartMaximum(39_000)).toBe(40_000);
    expect(getChartMaximum(0)).toBe(0);
    expect(formatAxisAmount(0)).toBe("Bs 0");
    expect(formatAxisAmount(40_000)).toMatch(/^Bs 40/);
  });

  it("keeps exact amounts accessible for every bar", () => {
    render(<BarChartMultiVertical mountsByMonth={[
      { name: "Enero", counts: [12_500, 8_000] },
      { name: "Febrero", counts: [20_000, 4_500] },
    ]} />);
    expect(screen.getByRole("group", { name: /Escala desde Bs 0/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enero, Incachaca/ })).toHaveAttribute("title");
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("explains when the selected year has no revenue", () => {
    render(<BarChartMultiVertical mountsByMonth={[{ name: "Enero", counts: [0, 0] }]} />);
    expect(screen.getByRole("status")).toHaveTextContent("No hay recaudación registrada");
  });
});
