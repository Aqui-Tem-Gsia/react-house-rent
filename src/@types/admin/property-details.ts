export interface PropertyDetails {
  id: string;
  type: "HOUSE" | "APARTMENT";
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  features: string[];
  listingId: string;
  createdAt: string;
  updatedAt: string;
}
