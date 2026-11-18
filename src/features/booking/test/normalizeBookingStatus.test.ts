import { describe, expect, it } from "vitest";
import { normalizeBookingStatus } from "../types/normalizeBookingStatus";

describe("normalizeBookingStatus", () => {
  it("maps the legacy paid alias to confirmed", () => {
    expect(normalizeBookingStatus("paid")).toBe("confirmed");
  });

  it.each(["pending", "confirmed", "cancelled", "completed"] as const)(
    "preserves the canonical status %s",
    (status) => {
      expect(normalizeBookingStatus(status)).toBe(status);
    },
  );

  it("uses pending for an absent or unknown status", () => {
    expect(normalizeBookingStatus(undefined)).toBe("pending");
    expect(normalizeBookingStatus("unknown")).toBe("pending");
  });
});
