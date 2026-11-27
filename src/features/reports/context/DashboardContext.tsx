/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";

import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../tourPackage/context/TourPackageContext";
import { useUserContext } from "../../userManagement/context/UserContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
import { getBookingReportSummaryRequest } from "../../booking/service/bookingService";
import type { BookingReportSummary } from "../../booking/service/bookingService";

import type { TourPackageType } from "../../tourPackage/types/TourPackageType";
import type { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import type { DateRangeType } from "../../tourPackage/types/DateRangeType";

export interface GuideStatsType {
  guideId: string;
  guideName: string;
  destinations: {
    destinationName: string;
    destinationImage: string;
    count: number;
  }[];
}

type MonthData = { name: string; counts: number[] };

interface DashboardContextType {
  loading: boolean;
  error: string | null;

  touristDestinations: TouristDestinationType[];
  tourPackages: TourPackageType[];

  yearSelected: string;
  setYearSelected: (year: string) => void;
  yearsToSelect: number[];
  monthlyByDestination: {
    name: string;
    rows: { year: number; month: number; count: number; amount: number }[];
  }[];

  totalBookings: number;
  totalRevenue: number;
  bookingsByMonth: MonthData[];
  bookingsByMonthAmounts: MonthData[];
  bookingsByTouristDestination: { name: string; value: number }[];
  packagesSoldBySeller: {
    name: string;
    value: number;
    img: string;
    tourPackageCounts: { tourPackageId: string; count: number }[];
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

const getId = (x: any) => x?.id ?? x?._id;

const MONTH_NAMES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const emptyMonths = (): MonthData[] =>
  MONTH_NAMES.map((name) => ({ name, counts: [] }));

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { touristDestinations } = useTouristDestinationContext();
  const { tourPackages } = useTourPackageContext();
  const { users, guides } = useUserContext();
  const { dateRanges } = useDateRangeContext();

  const [summary, setSummary] = useState<BookingReportSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [yearSelected, setYearSelected] = useState(
    new Date().getFullYear().toString(),
  );

  useEffect(() => {
    let cancelled = false;

    const loadSummary = async () => {
      setLoading(true);
      const data = await getBookingReportSummaryRequest();
      if (cancelled) return;

      if (!data) {
        setSummary(null);
        setError("No se pudo cargar el resumen de reportes");
      } else {
        setSummary(data);
        setError(null);
      }
      setLoading(false);
    };

    void loadSummary();

    return () => {
      cancelled = true;
    };
  }, []);

  const yearsToSelect = useMemo(() => {
    const years = summary?.years?.filter((year) => Number.isFinite(year)) ?? [];
    const unique = Array.from(new Set(years)).sort((a, b) => a - b);
    return unique.length ? unique : [dayjs().year()];
  }, [summary]);

  const destinationByTourPackage = useMemo(() => {
    const map = new Map<string, string>();
    tourPackages.forEach((pkg) => {
      map.set(getId(pkg), pkg.touristDestination);
    });
    return map;
  }, [tourPackages]);

  const destinationMonthly = useMemo(() => {
    const rows = summary?.byTourPackageMonth ?? [];
    const counts = new Map<string, number[]>();
    const amounts = new Map<string, number[]>();

    touristDestinations.forEach((destination) => {
      counts.set(destination.id!, Array(12).fill(0));
      amounts.set(destination.id!, Array(12).fill(0));
    });

    rows.forEach((row) => {
      const destinationId = destinationByTourPackage.get(row.tourPackageId);
      if (!destinationId) return;
      const countList = counts.get(destinationId);
      const amountList = amounts.get(destinationId);
      if (!countList || !amountList) return;

      const monthIndex = row.month - 1;
      if (monthIndex < 0 || monthIndex > 11) return;

      countList[monthIndex] += row.count;
      amountList[monthIndex] += row.totalAmount;
    });

    return { counts, amounts };
  }, [summary, touristDestinations, destinationByTourPackage]);

  const monthlyByDestination = useMemo(() => {
    const rows = summary?.byTourPackageMonth ?? [];

    return touristDestinations.map((destination) => ({
      name: destination.name,
      rows: rows
        .filter(
          (row) =>
            destinationByTourPackage.get(row.tourPackageId) === destination.id,
        )
        .map((row) => ({
          year: row.year,
          month: row.month,
          count: row.count,
          amount: row.totalAmount,
        })),
    }));
  }, [summary, touristDestinations, destinationByTourPackage]);

  const bookingsByMonth = useMemo(() => {
    const template = emptyMonths();
    destinationMonthly.counts.forEach((monthly) => {
      monthly.forEach((count, idx) => {
        template[idx].counts.push(count);
      });
    });
    return template;
  }, [destinationMonthly]);

  const bookingsByMonthAmounts = useMemo(() => {
    const template = emptyMonths();
    destinationMonthly.amounts.forEach((monthly) => {
      monthly.forEach((amount, idx) => {
        template[idx].counts.push(amount);
      });
    });
    return template;
  }, [destinationMonthly]);

  const totalBookings = useMemo(() => {
    let total = 0;
    destinationMonthly.counts.forEach((monthly) => {
      total += monthly.reduce((acc, value) => acc + value, 0);
    });
    return total;
  }, [destinationMonthly]);

  const bookingsByTouristDestination = useMemo(
    () =>
      touristDestinations.map((destination) => {
        const monthly = destinationMonthly.counts.get(destination.id!) ?? [];
        return {
          name: destination.name,
          value: monthly.reduce((acc, value) => acc + value, 0),
        };
      }),
    [destinationMonthly, touristDestinations],
  );

  const packagesSoldBySeller = useMemo(() => {
    const sellerMap = new Map<
      string,
      { total: number; packages: Map<string, number> }
    >();

    (summary?.bySellerTourPackage ?? []).forEach((row) => {
      const entry =
        sellerMap.get(row.sellerId) ??
        { total: 0, packages: new Map<string, number>() };
      entry.total += row.count;
      entry.packages.set(
        row.tourPackageId,
        (entry.packages.get(row.tourPackageId) ?? 0) + row.count,
      );
      sellerMap.set(row.sellerId, entry);
    });

    return Array.from(sellerMap.entries()).map(([sellerId, entry]) => {
      const seller = users.find((user) => user.id === sellerId);
      return {
        name: seller?.firstName || "Vendedor",
        value: entry.total,
        img: seller?.imageUrl || "",
        tourPackageCounts: Array.from(entry.packages.entries()).map(
          ([tourPackageId, count]) => ({ tourPackageId, count }),
        ),
      };
    });
  }, [summary, users]);

  const cumulativeBookings = useMemo(() => {
    return (summary?.daily ?? [])
      .filter((row) => dayjs(row.date).year() === Number(yearSelected))
      .map((row) => ({ date: row.date, value: row.count }));
  }, [summary, yearSelected]);

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
        destinations: touristDestinations
          .map((td) => ({
            destinationName: td.name,
            destinationImage:
              td.images.find((image): image is string => typeof image === "string") ?? "",
            count: dests[td.id] || 0,
          }))
          .filter((d) => d.count > 0),
      };
    });
  }, [dateRanges, tourPackages, guides, touristDestinations]);

  return (
    <DashboardContext.Provider
      value={{
        loading,
        error,
        touristDestinations,
        tourPackages,
        yearSelected,
        setYearSelected,
        yearsToSelect,
        monthlyByDestination,
        totalBookings,
        totalRevenue: summary?.totalRevenue ?? 0,
        bookingsByMonth,
        bookingsByMonthAmounts,
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
