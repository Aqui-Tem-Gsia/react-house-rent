export const PropertyType = {
  HOUSE: "HOUSE",
  APARTMENT: "APARTMENT",
  KITNET: "KITNET",
  STUDIO: "STUDIO",
  OTHER: "OTHER",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
