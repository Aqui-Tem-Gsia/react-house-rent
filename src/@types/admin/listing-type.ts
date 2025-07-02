export const ListingType = {
  RENT: "RENT",
  SALE: "SALE",
} as const;

export type ListingType = (typeof ListingType)[keyof typeof ListingType];
