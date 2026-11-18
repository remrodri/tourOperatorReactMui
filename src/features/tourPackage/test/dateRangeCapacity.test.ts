import { describe, expect, it } from "vitest";
import { dateRangeSchema } from "../components/DateManager/DateSelectorForm/validation/dateRangeSchema";
import { tourPackageSchema } from "../components/tourPackageForm/validation/tourPackageSchema";

const baseValues = (capacity: number | undefined) => ({
  name: "Paquete de prueba",
  tourType: "tour-type-id",
  touristDestination: "destination-id",
  duration: 2,
  price: 150,
  itinerary: {
    days: [
      { dayNumber: 1, activities: [{ description: "Visita", time: "08:00" }] },
      { dayNumber: 2, activities: [{ description: "Caminata", time: "09:00" }] },
    ],
  },
  dateRanges: [
    {
      dates: ["10-01-2026", "11-01-2026"],
      guides: ["guide-id"],
      capacity,
    },
  ],
});

describe("tourPackage departure capacity", () => {
  it("accepts a positive integer capacity for a new departure", async () => {
    await expect(
      tourPackageSchema(false).validate(baseValues(10)),
    ).resolves.toBeTruthy();
  });

  it("rejects zero or missing capacity for a new departure", async () => {
    await expect(
      tourPackageSchema(false).validate(baseValues(0)),
    ).rejects.toThrow();
    await expect(
      tourPackageSchema(false).validate(baseValues(undefined)),
    ).rejects.toThrow();
  });

  it("keeps legacy ranges without capacity valid while editing", async () => {
    await expect(
      tourPackageSchema(true).validate(baseValues(undefined)),
    ).resolves.toBeTruthy();
  });
});

describe("departure form capacity", () => {
  const formValues = (capacity: number | "" | undefined) => ({
    dates: ["10-01-2026"],
    guides: ["guide-id"],
    capacity,
  });

  it("requires a positive integer capacity when creating a departure", async () => {
    await expect(
      dateRangeSchema({ requireCapacity: true }).validate(formValues(8)),
    ).resolves.toBeTruthy();
    await expect(
      dateRangeSchema({ requireCapacity: true }).validate(formValues(0)),
    ).rejects.toThrow();
    await expect(
      dateRangeSchema({ requireCapacity: true }).validate(formValues("")),
    ).rejects.toThrow();
  });

  it("allows editing a legacy departure without capacity", async () => {
    await expect(
      dateRangeSchema({ requireCapacity: false }).validate(formValues(undefined)),
    ).resolves.toBeTruthy();
    await expect(
      dateRangeSchema({ requireCapacity: false }).validate(formValues(0)),
    ).rejects.toThrow();
  });
});
