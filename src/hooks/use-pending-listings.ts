import { useQuery } from "@tanstack/react-query";
import { getPendingListings } from "@/services/listings-service";

export function usePendingListings() {
  return useQuery({
    queryKey: ["pending-listings"],
    queryFn: getPendingListings,
  });
}
