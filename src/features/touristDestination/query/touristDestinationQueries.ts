export const touristDestinationKeys = {
  all: ["tourist-destinations"] as const,
  lists: () => [...touristDestinationKeys.all, "list"] as const,
  detail: (id: string) => [...touristDestinationKeys.all, id] as const,
};
