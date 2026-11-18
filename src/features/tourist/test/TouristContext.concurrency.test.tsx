import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TouristType } from "../../booking/types/TouristType";
import { TouristProvider, useTouristContext } from "../context/TouristContext";
import {
  getTouristsCountRequest,
  getTouristsFeedRequest,
  type FeedPage,
} from "../service/touristService";

vi.mock("../service/touristService", () => ({
  getTouristsByIdsRequest: vi.fn(),
  getTouristsCountRequest: vi.fn(),
  getTouristsFeedRequest: vi.fn(),
  updateTouristRequest: vi.fn(),
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

const buildTourist = (id: string, firstName: string): TouristType => ({
  id,
  firstName,
  lastName: "Prueba",
  email: `${id}@example.test`,
  phone: "70000000",
  nationality: "Boliviana",
  dateOfBirth: "1990-01-01",
  documentType: "ci",
});

const buildPage = (
  items: TouristType[],
  nextCursor: string | null,
  hasMore: boolean,
): FeedPage<TouristType> => ({
  items,
  pagination: { nextCursor, hasMore },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <TouristProvider>{children}</TouristProvider>
);

describe("TouristContext stale responses", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getTouristsCountRequest).mockResolvedValue(1);
  });

  it("keeps the newest search when an older loadMore resolves late", async () => {
    const initialTourist = buildTourist("tourist-1", "Ana");
    const staleTourist = buildTourist("tourist-stale", "Antigua");
    const currentTourist = buildTourist("tourist-current", "Maria");

    const request = vi.mocked(getTouristsFeedRequest);
    request.mockReturnValueOnce(
      Promise.resolve(buildPage([initialTourist], "cursor-initial", true)),
    );

    const { result } = renderHook(() => useTouristContext(), { wrapper });

    act(() => {
      void result.current.fetchTourists();
    });
    await waitFor(() => expect(result.current.tourists).toHaveLength(1));
    expect(result.current.hasMore).toBe(true);

    const stalePage = deferred<FeedPage<TouristType> | null>();
    request.mockReturnValueOnce(stalePage.promise);

    let staleLoadMore!: Promise<void>;
    act(() => {
      staleLoadMore = result.current.loadMoreTourists();
    });
    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({ cursor: "cursor-initial", limit: 50 }),
    );

    const currentPage = deferred<FeedPage<TouristType> | null>();
    request.mockReturnValueOnce(currentPage.promise);

    let currentSearch!: Promise<void>;
    act(() => {
      currentSearch = result.current.fetchTourists("Maria");
    });
    expect(request).toHaveBeenCalledTimes(3);

    await act(async () => {
      currentPage.resolve(
        buildPage([currentTourist], "cursor-current", true),
      );
      await currentSearch;
    });
    await waitFor(() =>
      expect(result.current.tourists.map((tourist) => tourist.id)).toEqual([
        "tourist-current",
      ]),
    );
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loadingMore).toBe(false);

    await act(async () => {
      stalePage.resolve(buildPage([staleTourist], "cursor-stale", false));
      await staleLoadMore;
    });

    expect(result.current.tourists.map((tourist) => tourist.id)).toEqual([
      "tourist-current",
    ]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loadingMore).toBe(false);

    request.mockReturnValueOnce(
      Promise.resolve(buildPage([], "cursor-end", false)),
    );
    let currentLoadMore!: Promise<void>;
    act(() => {
      currentLoadMore = result.current.loadMoreTourists();
    });
    await act(async () => {
      await currentLoadMore;
    });

    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({
        search: "Maria",
        cursor: "cursor-current",
      }),
    );
  });

  it("ignores a stale initial response and its error", async () => {
    const stalePage = deferred<FeedPage<TouristType> | null>();
    const currentPage = deferred<FeedPage<TouristType> | null>();
    const currentTourist = buildTourist("tourist-current", "Maria");

    const request = vi.mocked(getTouristsFeedRequest);
    request.mockReturnValueOnce(stalePage.promise);
    request.mockReturnValueOnce(currentPage.promise);

    const { result } = renderHook(() => useTouristContext(), { wrapper });

    let staleFetch!: Promise<void>;
    act(() => {
      staleFetch = result.current.fetchTourists();
    });
    let currentFetch!: Promise<void>;
    act(() => {
      currentFetch = result.current.fetchTourists("Maria");
    });
    expect(request).toHaveBeenCalledTimes(2);

    await act(async () => {
      currentPage.resolve(
        buildPage([currentTourist], "cursor-current", true),
      );
      await currentFetch;
    });
    await waitFor(() =>
      expect(result.current.tourists.map((tourist) => tourist.id)).toEqual([
        "tourist-current",
      ]),
    );

    await act(async () => {
      stalePage.reject(new Error("stale request"));
      await staleFetch;
    });

    expect(result.current.tourists.map((tourist) => tourist.id)).toEqual([
      "tourist-current",
    ]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
