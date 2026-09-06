"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import type { ListingType } from "@/@types/admin/listing-type";
import type { PropertyFeature } from "@/@types/admin/property-feature";
import type { PropertyType } from "@/@types/admin/property-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAd } from "@/hooks/use-create-ad";
import {
  createAdAdminSchema,
  type CreateAdAdminFormData,
} from "@/schemas/create-ad-admin-schema";
import { getAddressByCep } from "@/services/cep-service";
import {
  listingTypeMap,
  propertyFeatureMap,
  propertyTypeMap,
  translateListingType,
  translatePropertyFeature,
  translatePropertyType,
} from "@/utils/translate";

const MAX_IMAGES = 5;

const listingTypes = Object.keys(listingTypeMap) as ListingType[];
const propertyTypes = Object.keys(propertyTypeMap) as PropertyType[];
const propertyFeatures = Object.keys(propertyFeatureMap) as PropertyFeature[];

// react-hook-form also runs `setValueAs` on `defaultValues` during field
// registration, not just on user keystrokes — so these must tolerate
// already-typed values (e.g. `expirationDays: 30` as a number), not just
// the raw string a DOM input event provides.

const toOptionalText = (value: unknown) => {
  if (typeof value !== "string") return value as string | undefined;
  return value.trim() === "" ? undefined : value;
};

const toOptionalDate = (value: unknown) => {
  if (typeof value !== "string") return value as string | undefined;
  return value.trim() === "" ? undefined : new Date(value).toISOString();
};

const toOptionalNumber = (value: unknown) => {
  if (typeof value !== "string") return value as number | undefined;
  return value.trim() === "" ? undefined : Number(value);
};

const toRequiredNumber = (value: unknown) => {
  if (typeof value !== "string") return value as number;
  return value.trim() === "" ? Number.NaN : Number(value);
};

export const AdminCreateAdPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const lastFetchedCepRef = useRef<string | null>(null);

  const createAdMutation = useCreateAd();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateAdAdminFormData>({
    resolver: zodResolver(createAdAdminSchema),
    defaultValues: {
      propertyFeatures: [],
      expirationDays: 30,
    },
  });

  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const cepValue = watch("address.cep");

  useEffect(() => {
    const digits = (cepValue ?? "").replace(/\D/g, "");

    if (digits.length !== 8 || digits === lastFetchedCepRef.current) {
      return;
    }

    let cancelled = false;
    setIsCepLoading(true);

    getAddressByCep(digits)
      .then((address) => {
        if (cancelled) return;

        lastFetchedCepRef.current = digits;

        if (!address) {
          toast.error("CEP não encontrado");
          return;
        }

        setValue("address.street", address.logradouro, {
          shouldValidate: true,
        });
        setValue("address.neighborhood", address.bairro, {
          shouldValidate: true,
        });
        setValue("address.city", address.localidade, {
          shouldValidate: true,
        });
        setValue("address.state", address.uf, { shouldValidate: true });
      })
      .catch(() => {
        if (!cancelled) toast.error("Erro ao buscar CEP");
      })
      .finally(() => {
        if (!cancelled) setIsCepLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cepValue, setValue]);

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > MAX_IMAGES) {
      toast.error(`Máximo de ${MAX_IMAGES} imagens`);
    }

    setImages(files.slice(0, MAX_IMAGES));
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((current) => current.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CreateAdAdminFormData) => {
    createAdMutation.mutate({ payload: data, images });
  };

  return (
    <div className="container mx-auto p-3 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Criar Anúncio</h1>
        <p className="text-muted-foreground">
          Anúncio criado pelo administrador é publicado imediatamente, sem plano
          e sem pagamento.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cep">
                CEP
                {isCepLoading && (
                  <span className="text-xs font-normal text-muted-foreground">
                    Buscando endereço...
                  </span>
                )}
              </Label>
              <Input
                {...register("address.cep")}
                id="cep"
                placeholder="74000-000"
              />
              {errors.address?.cep && (
                <span className="text-red-500 text-sm">
                  {errors.address.cep.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                {...register("address.street")}
                id="street"
                placeholder="Rua das Flores"
              />
              {errors.address?.street && (
                <span className="text-red-500 text-sm">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                {...register("address.number")}
                id="number"
                placeholder="123"
              />
              {errors.address?.number && (
                <span className="text-red-500 text-sm">
                  {errors.address.number.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                {...register("address.neighborhood")}
                id="neighborhood"
                placeholder="Centro"
              />
              {errors.address?.neighborhood && (
                <span className="text-red-500 text-sm">
                  {errors.address.neighborhood.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                {...register("address.city")}
                id="city"
                placeholder="Goiânia"
              />
              {errors.address?.city && (
                <span className="text-red-500 text-sm">
                  {errors.address.city.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                {...register("address.state")}
                id="state"
                maxLength={2}
                placeholder="GO"
              />
              {errors.address?.state && (
                <span className="text-red-500 text-sm">
                  {errors.address.state.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Complemento (opcional)</Label>
              <Input
                {...register("address.complement", {
                  setValueAs: toOptionalText,
                })}
                id="complement"
                placeholder="Bloco B, apto 201"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencePoint">
                Ponto de referência (opcional)
              </Label>
              <Input
                {...register("address.referencePoint", {
                  setValueAs: toOptionalText,
                })}
                id="referencePoint"
                placeholder="Próximo à praça"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anúncio</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Título</Label>
              <Input
                {...register("title")}
                id="title"
                placeholder="Casa com vista para o lago"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="listingType">Tipo de anúncio</Label>
              <Controller
                name="listingType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="listingType"
                      className="w-full"
                      ref={field.ref}
                      onBlur={field.onBlur}
                    >
                      <SelectValue placeholder="Selecione o tipo de anúncio" />
                    </SelectTrigger>
                    <SelectContent>
                      {listingTypes.map((listingType) => (
                        <SelectItem key={listingType} value={listingType}>
                          {translateListingType(listingType)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.listingType && (
                <span className="text-red-500 text-sm">
                  {errors.listingType.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Tipo de imóvel</Label>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="propertyType"
                      className="w-full"
                      ref={field.ref}
                      onBlur={field.onBlur}
                    >
                      <SelectValue placeholder="Selecione o tipo de imóvel" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((propertyType) => (
                        <SelectItem key={propertyType} value={propertyType}>
                          {translatePropertyType(propertyType)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.propertyType && (
                <span className="text-red-500 text-sm">
                  {errors.propertyType.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                {...register("price", { setValueAs: toRequiredNumber })}
                id="price"
                type="number"
                min={0}
                step="0.01"
                placeholder="250000"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área em m² (opcional)</Label>
              <Input
                {...register("area", { setValueAs: toOptionalNumber })}
                id="area"
                type="number"
                min={0}
                step="0.01"
                placeholder="120"
              />
              {errors.area && (
                <span className="text-red-500 text-sm">
                  {errors.area.message}
                </span>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                {...register("description")}
                id="description"
                rows={4}
                placeholder="Descreva o imóvel, a localização e os diferenciais."
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                {...register("phone")}
                id="phone"
                placeholder="(62) 91234-5678"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
              <Input
                {...register("whatsapp", { setValueAs: toOptionalText })}
                id="whatsapp"
                placeholder="(62) 91234-5678"
              />
              {errors.whatsapp && (
                <span className="text-red-500 text-sm">
                  {errors.whatsapp.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Quartos (opcional)</Label>
              <Input
                {...register("bedrooms", { setValueAs: toOptionalNumber })}
                id="bedrooms"
                type="number"
                min={0}
                step={1}
                placeholder="3"
              />
              {errors.bedrooms && (
                <span className="text-red-500 text-sm">
                  {errors.bedrooms.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Banheiros (opcional)</Label>
              <Input
                {...register("bathrooms", { setValueAs: toOptionalNumber })}
                id="bathrooms"
                type="number"
                min={0}
                step={1}
                placeholder="2"
              />
              {errors.bathrooms && (
                <span className="text-red-500 text-sm">
                  {errors.bathrooms.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="parkingSpots">Vagas de garagem (opcional)</Label>
              <Input
                {...register("parkingSpots", { setValueAs: toOptionalNumber })}
                id="parkingSpots"
                type="number"
                min={0}
                step={1}
                placeholder="1"
              />
              {errors.parkingSpots && (
                <span className="text-red-500 text-sm">
                  {errors.parkingSpots.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableFrom">
                Disponível a partir de (opcional)
              </Label>
              <Input
                {...register("availableFrom", { setValueAs: toOptionalDate })}
                id="availableFrom"
                type="date"
              />
              {errors.availableFrom && (
                <span className="text-red-500 text-sm">
                  {errors.availableFrom.message}
                </span>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Características (opcional)</Label>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {propertyFeatures.map((feature) => (
                  <Controller
                    key={feature}
                    name="propertyFeatures"
                    control={control}
                    render={({ field }) => {
                      const selected = field.value ?? [];

                      return (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={feature}
                            checked={selected.includes(feature)}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked === true
                                  ? [...selected, feature]
                                  : selected.filter((item) => item !== feature)
                              )
                            }
                          />
                          <Label htmlFor={feature} className="font-normal">
                            {translatePropertyFeature(feature)}
                          </Label>
                        </div>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Duração</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-w-xs">
              <Label htmlFor="expirationDays">Dias até o anúncio expirar</Label>
              <Input
                {...register("expirationDays", {
                  setValueAs: toRequiredNumber,
                })}
                id="expirationDays"
                type="number"
                min={1}
                max={365}
                step={1}
              />
              {errors.expirationDays && (
                <span className="text-red-500 text-sm">
                  {errors.expirationDays.message}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="images">
                Selecione até {MAX_IMAGES} imagens (PNG ou JPEG)
              </Label>
              <Input
                id="images"
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleImagesChange}
              />
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                {previews.map((preview, index) => (
                  <div key={preview} className="relative">
                    <img
                      src={preview}
                      alt={`Imagem ${index + 1} do anúncio`}
                      className="h-24 w-full rounded-md border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label={`Remover imagem ${index + 1}`}
                      className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-destructive text-white shadow hover:bg-destructive/90"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 md:w-auto"
          style={{ backgroundColor: "#912C21" }}
          disabled={createAdMutation.isPending}
        >
          {createAdMutation.isPending ? "Publicando..." : "Publicar anúncio"}
        </Button>
      </form>
    </div>
  );
};
