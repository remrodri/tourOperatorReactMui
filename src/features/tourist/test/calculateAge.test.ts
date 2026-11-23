import { describe, expect, it } from "vitest";
import { calculateAge } from "../utils/calculateAge";

describe("calculateAge", () => {
  const reference = new Date("2026-11-23T12:00:00Z");

  it("calculates ISO and legacy display formats", () => {
    expect(calculateAge("1990-01-01", reference)).toBe(36);
    expect(calculateAge("01-01-1990", reference)).toBe(36);
    expect(calculateAge("01/01/1990", reference)).toBe(36);
  });

  it("returns null instead of zero for invalid or future dates", () => {
    expect(calculateAge("", reference)).toBeNull();
    expect(calculateAge("31-02-1990", reference)).toBeNull();
    expect(calculateAge("2030-01-01", reference)).toBeNull();
  });
});
