import type { User } from "../user";
import type { Address } from "./address";
import type { ListingType } from "./listing-type";
import type { PropertyFeature } from "./property-feature";
import type { PropertyType } from "./property-type";

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  price: number;
  availableFrom: string;
  whatsapp: string;
  phone: string;
  features: PropertyFeature[];
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  address: Address;
  images: string[];
  user: User;
  createdAt: string;
}
