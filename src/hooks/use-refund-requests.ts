import type { RefundRequestStatus } from '@/@types/admin/refund-request';
import {
  getRefundRequests,
  updateRefundRequestStatus,
} from '@/services/refund-service';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useRefundRequests() {
  return useQuery({
    queryKey: ['refund-requests'],
    queryFn: getRefundRequests,
  });
}

export function useUpdateRefundRequestStatus() {
  return useMutation({
    mutationKey: ['update-refund-request-status'],
    mutationFn: ({ id, status }: { id: string; status: RefundRequestStatus }) =>
      updateRefundRequestStatus(id, status),
  });
}
