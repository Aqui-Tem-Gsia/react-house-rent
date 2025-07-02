import type { Address } from "./address";
import type { PropertyDetails } from "./property-details";
import type { User } from "../user";

export type ListingStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
export type ListingType = "SALE" | "RENT";

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  status: ListingStatus;
  blockedReason: string | null;
  price: number;
  availableFrom: string;
  whatsapp: string;
  phone: string;
  userId: string;
  addressId: string;
  planId: string | null;
  publishedAt: string | null;
  expiresIn: string | null;
  createdAt: string;
  updatedAt: string;
  Address: Address;
  PropertyDetails: PropertyDetails;
  User: User;
  Images: string[];
}
