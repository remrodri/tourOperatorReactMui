import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BookingProvider, useBookingContext } from "../context/BookingContext";
import {
  getBookingsFeedRequest,
  type FeedPage,
} from "../service/bookingService";
import type { BookingType } from "../types/BookingType";

vi.mock("../../tourist/context/TouristContext", () => ({
  useTouristContext: () => ({
    addTouristFromBooking: vi.fn(),
    ensureTouristsByIds: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("../service/bookingService", () => ({
  cancelBookingRequest: vi.fn(),
  createBookingRequest: vi.fn(),
  getBookingsFeedRequest: vi.fn(),
  getDateRangeSummaryRequest: vi.fn(),
  updateAttendanceRequest: vi.fn(),
}));

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const buildBooking = (
  id: string,
  bookingCode: string,
  status: BookingType["status"] = "pending",
): BookingType => ({
  id,
  tourPackageId: "package-1",
  dateRangeId: "range-1",
  sellerId: "seller-1",
  touristIds: [],
  totalPrice: 100,
  notes: "",
  status,
  paymentProofFolder: "proof",
  createdAt: "2026-01-01T00:00:00.000Z",
  bookingCode,
});

const buildPage = (
  items: BookingType[],
  nextCursor: string | null,
  hasMore: boolean,
): FeedPage<BookingType> => ({
  items,
  pagination: { nextCursor, hasMore },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookingProvider>{children}</BookingProvider>
);

describe("BookingContext stale responses", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ignores an older loadMore response after filters change", async () => {
    const initialBooking = buildBooking("booking-1", "B-001");
    const staleBooking = buildBooking("booking-stale", "B-STALE");
    const currentBooking = buildBooking("booking-current", "B-CURRENT", "confirmed");

    const request = vi.mocked(getBookingsFeedRequest);
    request.mockReturnValueOnce(
      Promise.resolve(buildPage([initialBooking], "cursor-initial", true)),
    );

    const { result } = renderHook(() => useBookingContext(), { wrapper });

    act(() => {
      result.current.fetchBookings();
    });
    await waitFor(() => expect(result.current.bookings).toHaveLength(1));
    expect(result.current.hasMore).toBe(true);

    const stalePage = deferred<FeedPage<BookingType> | null>();
    request.mockReturnValueOnce(stalePage.promise);

    let staleLoadMore!: Promise<void>;
    act(() => {
      staleLoadMore = result.current.loadMoreBookings();
    });
    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({ cursor: "cursor-initial", limit: 25 }),
    );

    const currentPage = deferred<FeedPage<BookingType> | null>();
    request.mockReturnValueOnce(currentPage.promise);

    act(() => {
      result.current.setBookingFilters({ status: "confirmed" });
    });
    expect(request).toHaveBeenCalledTimes(3);

    await act(async () => {
      currentPage.resolve(
        buildPage([currentBooking], "cursor-current", true),
      );
    });
    await waitFor(() =>
      expect(result.current.bookings.map((booking) => booking.id)).toEqual([
        "booking-current",
      ]),
    );
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loadingMore).toBe(false);

    await act(async () => {
      stalePage.resolve(buildPage([staleBooking], "cursor-stale", false));
      await staleLoadMore;
    });

    expect(result.current.bookings.map((booking) => booking.id)).toEqual([
      "booking-current",
    ]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loadingMore).toBe(false);

    request.mockReturnValueOnce(
      Promise.resolve(buildPage([], "cursor-end", false)),
    );
    let currentLoadMore!: Promise<void>;
    act(() => {
      currentLoadMore = result.current.loadMoreBookings();
    });
    await act(async () => {
      await currentLoadMore;
    });

    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: "confirmed",
        cursor: "cursor-current",
      }),
    );
  });

  it("ignores a stale initial response and its error", async () => {
    const stalePage = deferred<FeedPage<BookingType> | null>();
    const currentPage = deferred<FeedPage<BookingType> | null>();
    const currentBooking = buildBooking("booking-current", "B-CURRENT");

    const request = vi.mocked(getBookingsFeedRequest);
    request.mockReturnValueOnce(stalePage.promise);
    request.mockReturnValueOnce(currentPage.promise);

    const { result } = renderHook(() => useBookingContext(), { wrapper });

    act(() => {
      result.current.fetchBookings();
    });
    act(() => {
      result.current.fetchBookings();
    });
    expect(request).toHaveBeenCalledTimes(2);

    await act(async () => {
      currentPage.resolve(
        buildPage([currentBooking], "cursor-current", true),
      );
    });
    await waitFor(() =>
      expect(result.current.bookings.map((booking) => booking.id)).toEqual([
        "booking-current",
      ]),
    );

    await act(async () => {
      stalePage.reject(new Error("stale request"));
      await Promise.resolve();
    });

    expect(result.current.bookings.map((booking) => booking.id)).toEqual([
      "booking-current",
    ]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
