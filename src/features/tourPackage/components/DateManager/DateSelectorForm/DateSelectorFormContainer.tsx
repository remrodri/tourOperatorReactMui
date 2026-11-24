import DateSelectorForm from "./DateSelectorForm";
import { useEffect, useMemo, useState } from "react";
import { DateRangeType } from "../../../types/DateRangeType";
import { useUserContext } from "../../../../userManagement/context/UserContext";
import { dateRangeSchema } from "./validation/dateRangeSchema";
import { useFormik } from "formik";
import { useTourPackageContext } from "../../../context/TourPackageContext";
import {
  buildEconomicPlanPayload,
  emptyEconomicPlanFormValues,
  toEconomicPlanFormValues,
  type EconomicPlanFormValues,
} from "./economicPlanForm";

interface DateSelectorFormContainerProps {
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  duration: number;
  dateRanges: DateRangeType[];
  tourPackageId: string;
  currentDateRange?: DateRangeType;
}

export interface DateRangeFormValues {
  id?: string;
  dates: string[];
  guides: string[];
  capacity?: number | "";
  economicPlan: EconomicPlanFormValues;
}

const DateSelectorFormContainer: React.FC<DateSelectorFormContainerProps> = ({
  open,
  onClose,
  isEditing,
  duration,
  dateRanges,
  tourPackageId,
  currentDateRange,
}) => {
  const [includeEconomicPlan, setIncludeEconomicPlan] = useState<boolean>(
    Boolean(currentDateRange?.economicPlan),
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { createDateRange, updateDateRange } = useTourPackageContext();
  const { guides, fetchGuides } = useUserContext();

  const hasExistingPlan = Boolean(currentDateRange?.economicPlan);

  const blockedDates = useMemo(() => {
    const allDates = dateRanges
      .flatMap((dr) => dr.dates ?? [])
      .filter((date): date is string => Boolean(date));
    return Array.from(new Set(allDates));
  }, [dateRanges]);

  const validationSchema = useMemo(
    () =>
      dateRangeSchema({
        requireCapacity: !isEditing,
        includeEconomicPlan,
      }),
    [isEditing, includeEconomicPlan],
  );

  const onSubmit = async (values: DateRangeFormValues) => {
    setSubmitError(null);
    try {
      const capacity =
        values.capacity === "" || values.capacity === undefined
          ? undefined
          : Number(values.capacity);

      const economicPlan = includeEconomicPlan
        ? buildEconomicPlanPayload(values.economicPlan)
        : undefined;

      const basePayload = {
        dates: values.dates,
        guides: values.guides,
        ...(capacity !== undefined ? { capacity } : {}),
        ...(economicPlan ? { economicPlan } : {}),
      };

      if (isEditing) {
        await updateDateRange({
          ...(values.id ? { id: values.id } : {}),
          ...basePayload,
        });
      } else {
        await createDateRange({
          ...basePayload,
          tourPackageId,
        });
      }

      onClose();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la salida. Revisa los datos e inténtalo de nuevo.",
      );
    }
  };

  const formik = useFormik<DateRangeFormValues>({
    initialValues: {
      id: currentDateRange?.id || "",
      dates: currentDateRange?.dates || [],
      guides: currentDateRange?.guides || [],
      capacity: currentDateRange?.capacity ?? "",
      economicPlan: currentDateRange?.economicPlan
        ? toEconomicPlanFormValues(currentDateRange.economicPlan)
        : emptyEconomicPlanFormValues(),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handleCloseDialog = () => {
    setSubmitError(null);
    onClose();
  };

  return (
    <DateSelectorForm
      openDialog={open}
      handleCloseDialog={handleCloseDialog}
      duration={duration}
      guides={guides}
      formik={formik}
      blockedDates={blockedDates}
      requireCapacity={!isEditing}
      includeEconomicPlan={includeEconomicPlan}
      onToggleEconomicPlan={(include) => {
        setIncludeEconomicPlan(include);
        setSubmitError(null);
      }}
      hasExistingPlan={hasExistingPlan}
      submitError={submitError}
    />
  );
};
export default DateSelectorFormContainer;
