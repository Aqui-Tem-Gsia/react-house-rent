import type { ListingType } from "@/@types/admin/listing-type";
import type { PropertyFeature } from "@/@types/admin/property-feature";
import type { PropertyType } from "@/@types/admin/property-type";

export const listingTypeMap: Record<ListingType, string> = {
  RENT: "Aluguel",
  SALE: "Venda",
};

export const propertyTypeMap: Record<PropertyType, string> = {
  HOUSE: "Casa",
  APARTMENT: "Apartamento",
  KITNET: "Kitnet",
  STUDIO: "Studio",
  OTHER: "Outro",
};

export const propertyFeatureMap: Record<PropertyFeature, string> = {
  PETS_ALLOWED: "Aceita pets",
  FURNISHED: "Mobiliado",
  CHILDREN_ALLOWED: "Aceita crianças",
  HAS_ELEVATOR: "Elevador",
  HAS_BALCONY: "Sacada",
  HAS_BACKYARD: "Quintal",
  HAS_SECURITY: "Portaria",
  HAS_POOL: "Piscina",
};

export function translateListingType(type: ListingType): string {
  return listingTypeMap[type] ?? type;
}

export function translatePropertyType(type: PropertyType): string {
  return propertyTypeMap[type] ?? type;
}

export function translatePropertyFeature(feature: PropertyFeature): string {
  return propertyFeatureMap[feature] ?? feature;
}

// Rótulos que só existem no painel de métricas: o app mobile nunca mostra
// status cru nem meio de pagamento agregado.
export const listingStatusMap: Record<string, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  PENDING_APPROVAL: "Aguardando aprovação",
  PENDING_REVIEW: "Em revisão",
  PENDING_PAYMENT: "Aguardando pagamento",
  PENDING_REFUND: "Reembolso em análise",
  REFUNDED: "Reembolsado",
  BLOCKED: "Bloqueado",
  DELETED: "Excluído",
};

export const billingTypeMap: Record<string, string> = {
  PIX: "Pix",
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de débito",
  BOLETO: "Boleto",
  TRANSFER: "Transferência",
  DEPOSIT: "Depósito",
  UNDEFINED: "Não informado",
};

export function translateListingStatus(status: string): string {
  return listingStatusMap[status] ?? status;
}

export function translateBillingType(billingType: string): string {
  return billingTypeMap[billingType] ?? billingType;
}
