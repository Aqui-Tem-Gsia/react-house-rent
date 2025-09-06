import { PropertyType } from "@/@types/admin/property-type";

export const getPropertyTypeTranslation = (type: PropertyType) => {
  const translations: Record<PropertyType, string> = {
    [PropertyType.HOUSE]: "Casa",
    [PropertyType.APARTMENT]: "Apartamento",
    [PropertyType.KITNET]: "Kitnet",
    [PropertyType.STUDIO]: "Estúdio",
    [PropertyType.OTHER]: "Outro",
  };

  return translations[type] ?? type;
};
