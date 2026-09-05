import type { ListingType } from "./listing-type";
import type { PropertyFeature } from "./property-feature";
import type { PropertyType } from "./property-type";

export interface CreateListingAdminAddress {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  referencePoint?: string;
}

export interface CreateListingAdminPayload {
  title: string;
  listingType: ListingType;
  propertyType: PropertyType;
  availableFrom?: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpots?: number;
  price: number;
  area?: number;
  description: string;
  whatsapp?: string;
  phone: string;
  propertyFeatures?: PropertyFeature[];
  address: CreateListingAdminAddress;
  expirationDays: number;
}
