/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useFormFieldHelpers.ts
import { FormikProps } from "formik";

export function useFormFieldHelpers<T extends Record<string, any>>(
  formik: FormikProps<T>,
  guides: Partial<Record<keyof T, string>>,
) {
  const hasError = (path: string) =>
    Boolean(
      path.split(".").reduce((acc: any, key) => acc?.[key], formik.touched) &&
      path.split(".").reduce((acc: any, key) => acc?.[key], formik.errors),
    );

  const helperText = (path: string) => {
    const error = path
      .split(".")
      .reduce((acc: any, key) => acc?.[key], formik.errors);

    if (hasError(path)) return error;
    return guides[path as keyof T] ?? " ";
  };

  return { hasError, helperText };
}
