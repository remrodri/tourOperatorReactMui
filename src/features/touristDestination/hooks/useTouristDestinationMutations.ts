import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTouristDestinationRequest,
  updateTouristDestinationRequest,
  deleteTouristDestinationRequest,
} from "../service/touristDestinationService";
import { touristDestinationKeys } from "../query/touristDestinationQueries";

export const useCreateTouristDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTouristDestinationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: touristDestinationKeys.all,
      });
    },
  });
};

export const useUpdateTouristDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTouristDestinationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: touristDestinationKeys.all,
      });
    },
  });
};

export const useDeleteTouristDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTouristDestinationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: touristDestinationKeys.all,
      });
    },
  });
};
