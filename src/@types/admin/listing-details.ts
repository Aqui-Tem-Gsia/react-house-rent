import type { Address } from "./address";

export interface User {
  id: string;
  name: string;
  email: string;
}

export type ListingType = "SALE" | "RENT"; // adicione outros tipos se houver

export type Feature = "FURNISHED" | "HAS_POOL";
// | "GARAGE"
// | "ELEVATOR"
// Adicione outros se necessário

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  price: number;
  availableFrom: string; // ISO date string
  whatsapp: string;
  phone: string;
  features: Feature[];
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  address: Address;
  images: string[]; // ou outro tipo se necessário
  user: User;
}
