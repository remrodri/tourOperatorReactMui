import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import dayjs from "dayjs";

import { useBookingContext } from "../../booking/context/BookingContext";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../userManagement/context/UserContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";

import { BookingType } from "../../booking/types/BookingType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { User } from "../../userManagement/types/UserType";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";

interface DashboardContextType {
  loading: boolean;
  error: string | null;
  bookings: BookingType[];
  touristDestinations: TouristDestinationType[];
  tourPackages: TourPackageType[];
  touristDestinationWithBookings: any[];
  totalBookings: number;
  countedBookings: any[];
  yearSelected: string;

  getBokingsByYear: (year: string) => void;
  getBookingsByMonth: () => void;
  getBookingsByTouristDestination: () => void;

  bookingsByTouristDestination: { name: string; value: number }[];

  packagesSoldBySeller: {
    name: string;
    value: number;
    img: string;
    bookings: BookingType[];
  }[];

  getPackagesSoldBySeller: () => void;

  cumulativeBookings: any[];
  getCumulativeBookings: () => void;

  guidesStats: GuideStatsType[];
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

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  return ctx;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { bookings } = useBookingContext();
  const { touristDestinations } = useTouristDestinationContext();
  const { tourPackages } = useTourPackageContext();
  const { users, guides, fetchGuides } = useUserContext();
  const { dateRanges } = useDateRangeContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [yearSelected, setYearSelected] = useState(
    new Date().getFullYear().toString(),
  );

  const [touristDestinationWithBookings, setTDWithBookings] = useState<any[]>(
    [],
  );
  const [totalBookings, setTotalBookings] = useState(0);

  const [countedBookings, setCountedBookings] = useState<any[]>([]);
  const [bookingsByTouristDestination, setBookingsByTD] = useState<any[]>([]);

  const [packagesSoldBySeller, setPackagesSoldBySeller] = useState<any[]>([]);
  const [cumulativeBookings, setCumulativeBookings] = useState<any[]>([]);
  const [guidesStats, setGuidesStats] = useState<GuideStatsType[]>([]);

  // ---------------------------------------
  // HELPERS
  // ---------------------------------------

  const buildTDWithBookings = () => {
    return touristDestinations.map((td) => {
      const filtered = bookings.filter((b) => {
        const pkg = tourPackages.find((tp) => tp.id === b.tourPackageId);
        return pkg?.touristDestination === td.id;
      });

      return { ...td, filteredBookings: filtered };
    });
  };

  const buildMonthlyBookings = (data: any[]) => {
    const template = Array.from({ length: 12 }, (_, i) => ({
      name: dayjs().month(i).format("MMM"),
      counts: [] as number[], // <-- TIPADO CORRECTO
    }));

    data.forEach((dest: any) => {
      const monthly = Array(12).fill(0);
      dest.filteredBookings.forEach((b: BookingType) => {
        const d = dayjs(b.createdAt);
        if (d.year() === Number(yearSelected)) {
          monthly[d.month()]++;
        }
      });

      monthly.forEach((count, index) => {
        (template[index].counts as number[]).push(count); // <-- FIX
      });
    });

    return template;
  };

  const buildBookingsByTD = (data: any[]) =>
    data.map((td) => ({
      name: td.name,
      value: td.filteredBookings.length,
    }));

  const buildPackagesSoldBySeller = () => {
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
  };

  const buildCumulativeBookings = () => {
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
  };

  const buildGuidesStats = () => {
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
  };

  // ---------------------------------------
  // EFFECTS
  // ---------------------------------------

  useEffect(() => {
    console.log(":::1 ");
    const tdWB = buildTDWithBookings();
    setTDWithBookings(tdWB);
    setTotalBookings(
      tdWB.reduce((acc, td) => acc + td.filteredBookings.length, 0),
    );
  }, [bookings, tourPackages, touristDestinations]);

  useEffect(() => {
    // console.log(":::2 ");
    setCountedBookings(buildMonthlyBookings(touristDestinationWithBookings));
  }, [touristDestinationWithBookings, yearSelected]);

  useEffect(() => {
    // console.log(":::3 ");
    setBookingsByTD(buildBookingsByTD(touristDestinationWithBookings));
  }, [touristDestinationWithBookings]);

  useEffect(() => {
    // console.log(":::4 ");
    setPackagesSoldBySeller(buildPackagesSoldBySeller());
  }, [bookings, users]);

  useEffect(() => {
    // console.log(":::5 ");
    fetchGuides();
    setGuidesStats(buildGuidesStats());
  }, [dateRanges, users, touristDestinations, tourPackages]);

  useEffect(() => {
    setCumulativeBookings(buildCumulativeBookings());
  }, [bookings, yearSelected]);

  // ---------------------------------------
  // RETURN
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
        totalBookings,
        yearSelected,
        countedBookings,
        getBokingsByYear: setYearSelected,

        getBookingsByMonth: () =>
          setCountedBookings(
            buildMonthlyBookings(touristDestinationWithBookings),
          ),

        getBookingsByTouristDestination: () =>
          setBookingsByTD(buildBookingsByTD(touristDestinationWithBookings)),

        bookingsByTouristDestination,

        getPackagesSoldBySeller: () =>
          setPackagesSoldBySeller(buildPackagesSoldBySeller()),

        packagesSoldBySeller,

        cumulativeBookings,
        getCumulativeBookings: () =>
          setCumulativeBookings(buildCumulativeBookings()),

        guidesStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
