import type { ListingRefund } from './listing-refund';

export const RefundRequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type RefundRequestStatus =
  (typeof RefundRequestStatus)[keyof typeof RefundRequestStatus];

export interface RefundRequest {
  id: string;
  status: RefundRequestStatus;
  reason: string;
  userName: string;
  userEmail: string;
  listing: ListingRefund;
}
