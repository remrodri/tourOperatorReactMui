import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BookingCardV2 from "../components/showcase/card/BookingCardV2";
import type { BookingType } from "../types/BookingType";

const booking: BookingType = {
  id: "booking-1",
  tourPackageId: "package-1",
  tourPackageName: "Incachaca Cultural",
  dateRangeId: "departure-1",
  sellerId: "seller-1",
  touristIds: [],
  totalPrice: 480,
  payments: [],
  notes: "",
  status: "pending",
  paymentProofFolder: "tests",
  createdAt: "2026-11-27T00:00:00.000Z",
  bookingCode: "RSV-PRUEBA",
};

describe("BookingCardV2", () => {
  it("shows the package name supplied by the paginated booking feed", () => {
    render(
      <BookingCardV2
        booking={booking}
        index={0}
        tpInfo={null}
        balance={480}
        handleMenuOptions={vi.fn()}
        role="administrador"
      />,
    );

    expect(screen.getByText("Incachaca Cultural")).toBeInTheDocument();
  });
});
