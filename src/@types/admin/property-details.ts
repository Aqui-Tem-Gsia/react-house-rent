import type { PropertyType } from "./property-type";

export interface PropertyDetails {
  id: string;
  type: PropertyType;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  features: string[];
  listingId: string;
  createdAt: string;
  updatedAt: string;
}
