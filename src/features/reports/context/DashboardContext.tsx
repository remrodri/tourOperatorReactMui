/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import dayjs from "dayjs";

import { useBookingContext } from "../../booking/context/BookingContext";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../userManagement/context/UserContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";

import type { BookingType } from "../../booking/types/BookingType";
import type { TourPackageType } from "../../tourPackage/types/TourPackageType";
import type { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import type { DateRangeType } from "../../tourPackage/types/DateRangeType";

export interface TouristDestinationWithBookings extends TouristDestinationType {
  filteredBookings: BookingType[];
}

export interface GuideStatsType {
  guideId: string;
  guideName: string;
  guideImage: string;
  destinations: {
    destinationName: string;
    count: number;
  }[];
}

interface DashboardContextType {
  loading: boolean;
  error: string | null;

  bookings: BookingType[];
  touristDestinations: TouristDestinationType[];
  tourPackages: TourPackageType[];

  touristDestinationWithBookings: TouristDestinationWithBookings[];

  yearSelected: string;
  setYearSelected: (year: string) => void;

  totalBookings: number;
  bookingsByMonth: { name: string; counts: number[] }[];
  bookingsByTouristDestination: { name: string; value: number }[];
  packagesSoldBySeller: {
    name: string;
    value: number;
    img: string;
    bookings: BookingType[];
  }[];
  cumulativeBookings: { date: string; value: number }[];
  guidesStats: GuideStatsType[];

}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (ctx === undefined) {
    throw new Error(
      "useDashboardContext debe ser usado dentro de DashboardProvider",
    );
  }
  return ctx;
};

// helper id
const getId = (x: any) => x?.id ?? x?._id;

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { bookings } = useBookingContext();
  const { touristDestinations } = useTouristDestinationContext();
  const { tourPackages } = useTourPackageContext();
  const { users, guides } = useUserContext();
  const { dateRanges } = useDateRangeContext();

  const [yearSelected, setYearSelected] = useState(
    new Date().getFullYear().toString(),
  );

  const loading = false;
  const error = null;

  // ---------------------------------------
  // DERIVADOS
  // ---------------------------------------

  const touristDestinationWithBookings = useMemo(() => {
    return touristDestinations.map((td) => {
      const filtered = bookings.filter((b) => {
        const pkg = tourPackages.find((tp) => getId(tp) === b.tourPackageId);
        return pkg?.touristDestination === td.id;
      });
      return { ...td, filteredBookings: filtered };
    });
  }, [bookings, tourPackages, touristDestinations]);

  const totalBookings = useMemo(
    () =>
      touristDestinationWithBookings.reduce(
        (acc, td) => acc + td.filteredBookings.length,
        0,
      ),
    [touristDestinationWithBookings],
  );

  const bookingsByMonth = useMemo(() => {
    const template = Array.from({ length: 12 }, (_, i) => ({
      name: dayjs().month(i).format("MMM"),
      counts: [] as number[],
    }));

    touristDestinationWithBookings.forEach((dest) => {
      const monthly = Array(12).fill(0);

      dest.filteredBookings.forEach((b: BookingType) => {
        const d = dayjs(b.createdAt);
        if (d.year() === Number(yearSelected)) {
          monthly[d.month()]++;
        }
      });

      monthly.forEach((count, idx) => {
        template[idx].counts.push(count);
      });
    });

    return template;
  }, [touristDestinationWithBookings, yearSelected]);

  const bookingsByTouristDestination = useMemo(
    () =>
      touristDestinationWithBookings.map((td) => ({
        name: td.name,
        value: td.filteredBookings.length,
      })),
    [touristDestinationWithBookings],
  );

  const packagesSoldBySeller = useMemo(() => {
    const sellerMap: Record<string, BookingType[]> = {};

    bookings.forEach((b) => {
      if (!sellerMap[b.sellerId]) sellerMap[b.sellerId] = [];
      sellerMap[b.sellerId].push(b);
    });

    return Object.entries(sellerMap).map(([id, arr]) => {
      const seller = users.find((u) => u.id === id);
      return {
        name: seller?.firstName || "Vendedor",
        value: arr.length,
        img: seller?.imageUrl || "",
        bookings: arr,
      };
    });
  }, [bookings, users]);

  const cumulativeBookings = useMemo(() => {
    const filtered = bookings.filter(
      (b) => dayjs(b.createdAt).year() === Number(yearSelected),
    );

    const byDate: Record<string, number> = {};
    filtered.forEach((b) => {
      const d = dayjs(b.createdAt).format("YYYY-MM-DD");
      byDate[d] = (byDate[d] || 0) + 1;
    });

    return Object.entries(byDate).map(([date, value]) => ({
      date,
      value,
    }));
  }, [bookings, yearSelected]);

  const guidesStats = useMemo<GuideStatsType[]>(() => {
    const dateRangeMap = new Map<string, DateRangeType>();
    dateRanges.forEach((dr) => dr.id && dateRangeMap.set(dr.id, dr));

    const guideStats: Record<string, Record<string, number>> = {};

    tourPackages.forEach((pkg) => {
      pkg.dateRanges.forEach((dr) => {
        const drData = dr.id ? dateRangeMap.get(dr.id) : null;
        if (!drData?.guides) return;

        drData.guides.forEach((gid) => {
          if (!guideStats[gid]) guideStats[gid] = {};
          guideStats[gid][pkg.touristDestination] =
            (guideStats[gid][pkg.touristDestination] || 0) + 1;
        });
      });
    });

    return Object.entries(guideStats).map(([gid, dests]) => {
      const guide = guides.find((g) => g.id === gid);
      return {
        guideId: gid,
        guideName: guide
          ? `${guide.firstName} ${guide.lastName}`
          : "Guía desconocido",
        guideImage: guide?.imageUrl || "",
        destinations: touristDestinations
          .map((td) => ({
            destinationName: td.name,
            count: dests[td.id] || 0,
          }))
          .filter((d) => d.count > 0),
      };
    });
  }, [dateRanges, tourPackages, guides, touristDestinations]);

  // ---------------------------------------
  // PROVIDER
  // ---------------------------------------

  return (
    <DashboardContext.Provider
      value={{
        loading,
        error,
        bookings,
        touristDestinations,
        tourPackages,
        touristDestinationWithBookings,
        yearSelected,
        setYearSelected,
        totalBookings,
        bookingsByMonth,
        bookingsByTouristDestination,
        packagesSoldBySeller,
        cumulativeBookings,
        guidesStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
