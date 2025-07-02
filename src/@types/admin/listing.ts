import type { User } from "../user";
import type { Feature } from "./listing-details";
import type { ListingType } from "./listing-type";

export interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
  neighborhood: string;
  complement?: string;
  referencePoint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  price: number;
  availableFrom: string;
  whatsapp: string;
  phone: string;
  features: Feature[];
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  address: Address;
  images: string[];
  user: User;
  createdAt: string;
}
