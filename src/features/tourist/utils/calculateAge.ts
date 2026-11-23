const parseBirthDate = (value: string): Date | null => {
  const match = value?.trim().match(/^(\d{4})-(\d{2})-(\d{2})$|^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (!match) return null;

  const year = Number(match[1] ?? match[6]);
  const month = Number(match[2] ?? match[5]);
  const day = Number(match[3] ?? match[4]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) return null;
  return parsed;
};

export const calculateAge = (
  dateOfBirth: string,
  referenceDate = new Date(),
): number | null => {
  const birthDate = parseBirthDate(dateOfBirth);
  if (!birthDate || birthDate.getTime() > referenceDate.getTime()) return null;

  let age = referenceDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const birthdayOccurred =
    referenceDate.getUTCMonth() > birthDate.getUTCMonth() ||
    (referenceDate.getUTCMonth() === birthDate.getUTCMonth() &&
      referenceDate.getUTCDate() >= birthDate.getUTCDate());
  if (!birthdayOccurred) age -= 1;
  return age;
};

export const formatAge = (dateOfBirth: string): string => {
  const age = calculateAge(dateOfBirth);
  return age === null ? "—" : String(age);
};
