import { describe, expect, it } from "vitest";
import { canAccessAnalytics } from "../utils/analyticsAccess";

describe("analytics access", () => {
  it("allows administrador and operador de ventas", () => {
    expect(canAccessAnalytics("administrador")).toBe(true);
    expect(canAccessAnalytics("operador de ventas")).toBe(true);
  });

  it("rejects guia de turismo, empty and unknown roles", () => {
    expect(canAccessAnalytics("guia de turismo")).toBe(false);
    expect(canAccessAnalytics("Sin Rol")).toBe(false);
    expect(canAccessAnalytics("")).toBe(false);
    expect(canAccessAnalytics(null)).toBe(false);
  });
});
