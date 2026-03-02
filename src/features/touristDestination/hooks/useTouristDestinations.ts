import { useQuery } from "@tanstack/react-query";
import { getAllTouristDestinationRequest } from "../service/touristDestinationService";
import { touristDestinationKeys } from "../query/touristDestinationQueries";

export const useTouristDestinations = () => {
  return useQuery({
    queryKey: touristDestinationKeys.lists(),
    queryFn: getAllTouristDestinationRequest,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
