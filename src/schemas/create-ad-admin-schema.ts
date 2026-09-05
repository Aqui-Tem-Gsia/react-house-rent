import { z } from "zod";

const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;

export const createAdAdminSchema = z.object({
  title: z.string().min(1, "Informe o título do anúncio"),
  listingType: z.enum(["RENT", "SALE"], {
    required_error: "Selecione o tipo de anúncio",
    invalid_type_error: "Selecione o tipo de anúncio",
  }),
  propertyType: z.enum(["HOUSE", "APARTMENT", "KITNET", "STUDIO", "OTHER"], {
    required_error: "Selecione o tipo de imóvel",
    invalid_type_error: "Selecione o tipo de imóvel",
  }),
  availableFrom: z.string().optional(),
  bedrooms: z
    .number({ invalid_type_error: "Informe um número válido" })
    .int("Informe um número inteiro")
    .min(0, "O valor não pode ser negativo")
    .optional(),
  bathrooms: z
    .number({ invalid_type_error: "Informe um número válido" })
    .int("Informe um número inteiro")
    .min(0, "O valor não pode ser negativo")
    .optional(),
  parkingSpots: z
    .number({ invalid_type_error: "Informe um número válido" })
    .int("Informe um número inteiro")
    .min(0, "O valor não pode ser negativo")
    .optional(),
  price: z
    .number({
      required_error: "Informe o preço",
      invalid_type_error: "Informe o preço",
    })
    .min(0, "O preço não pode ser negativo"),
  area: z
    .number({ invalid_type_error: "Informe um número válido" })
    .min(0, "A área não pode ser negativa")
    .optional(),
  description: z.string().min(1, "Informe a descrição do anúncio"),
  whatsapp: z
    .string()
    .regex(phoneRegex, "WhatsApp inválido. Use o formato (62) 91234-5678")
    .optional(),
  phone: z
    .string()
    .min(1, "Informe o telefone")
    .regex(phoneRegex, "Telefone inválido. Use o formato (62) 91234-5678"),
  propertyFeatures: z
    .array(
      z.enum([
        "PETS_ALLOWED",
        "FURNISHED",
        "CHILDREN_ALLOWED",
        "HAS_ELEVATOR",
        "HAS_BALCONY",
        "HAS_BACKYARD",
        "HAS_SECURITY",
        "HAS_POOL",
      ])
    )
    .optional(),
  address: z.object({
    cep: z.string().regex(cepRegex, "CEP inválido. Use o formato 00000-000"),
    street: z.string().min(1, "Informe a rua"),
    number: z.string().min(1, "Informe o número"),
    neighborhood: z.string().min(1, "Informe o bairro"),
    city: z.string().min(1, "Informe a cidade"),
    state: z.string().length(2, "O estado deve ter 2 letras (ex.: GO)"),
    complement: z.string().optional(),
    referencePoint: z.string().optional(),
  }),
  expirationDays: z
    .number({
      required_error: "Informe os dias até o anúncio expirar",
      invalid_type_error: "Informe os dias até o anúncio expirar",
    })
    .int("Informe um número inteiro")
    .min(1, "Mínimo de 1 dia")
    .max(365, "Máximo de 365 dias"),
});

export type CreateAdAdminFormData = z.infer<typeof createAdAdminSchema>;
