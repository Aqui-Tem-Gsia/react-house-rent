import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveListing, rejectListing } from "@/services/listings-service";

export function useApproveListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listingId: string) => approveListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings-pending"] });
    },
  });
}

export function useRejectListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listingId,
      reason,
    }: {
      listingId: string;
      reason: string;
    }) => rejectListing(listingId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings-pending"] });
    },
  });
}
