export const PropertyType = {
  HOUSE: "Casa",
  APARTMENT: "Apartamento",
  KITNET: "Kitnet",
  STUDIO: "Estúdio",
  OTHER: "Outros",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
