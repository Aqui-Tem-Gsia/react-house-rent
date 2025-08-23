import type { Address } from './address';
import type { ListingType } from './listing-type';

export const ListingStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  PENDING_REVIEW: 'PENDING_REVIEW',
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PENDING_REFUND: 'PENDING_REFUND',
  REFUNDED: 'REFUNDED',
  BLOCKED: 'BLOCKED',
  DELETED: 'DELETED',
} as const;

export type ListingStatus = (typeof ListingStatus)[keyof typeof ListingStatus];

export interface ListingRefund {
  id: string;
  status: ListingStatus;
  title: string;
  type: ListingType;
  price: number;
  address: Address;
  expiresIn: string;
  planName: string;
  listingPeriod: string;
  lastPaymentDate: string;
  valueToRefund: number;
}
