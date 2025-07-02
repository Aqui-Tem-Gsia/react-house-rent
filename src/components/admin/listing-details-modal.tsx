import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getListingById } from "@/services/listings-service";
import { formatDate, formatPrice } from "@/utils/format";

import {
  MapPin,
  Phone,
  MessageSquare,
  Bed,
  Bath,
  Car,
  User,
  Mail,
  Check,
  X,
  Square,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

import { DialogHeader, DialogContent, Dialog, DialogTitle } from "../ui/dialog";
import { ImageGallery } from "./image-gallery";
import type { Listing } from "@/@types/admin/listing";

interface ListingDetailsModalProps {
  listingId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (listingId: string) => void;
  onReject: (listing: Listing) => void;
}

export function ListingDetailsModal({
  listingId,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ListingDetailsModalProps) {
  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListingById(listingId!),
    enabled: !!listingId,
  });

  console.log(listing);
  if (!listingId || !listing) return null;

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full !max-w-[60%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{listing?.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{listing?.type ?? "-"}</Badge>
                <Badge variant="outline">
                  {listing?.PropertyDetails?.type ?? "-"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#912C21]">
                {formatPrice(listing?.price, listing?.type)}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Slider de Imagens */}
          {/* {listing?.images && listing?.images.length > 0 && ( */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fotos do Imóvel</h3>
            <ImageGallery images={listing?.Images} title={listing?.title} />
          </div>
          {/* )} */}

          {/* Descrição */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground">{listing?.description}</p>
          </div>

          <Separator />

          {/* Detalhes do Imóvel */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Detalhes do Imóvel</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium">
                    {listing?.PropertyDetails?.area}m²
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Quartos</p>
                  <p className="font-medium">
                    {listing?.PropertyDetails?.bedrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Banheiros</p>
                  <p className="font-medium">
                    {listing?.PropertyDetails?.bathrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Vagas</p>
                  <p className="font-medium">
                    {listing?.PropertyDetails?.parkingSpots}
                  </p>
                </div>
              </div>
            </div>

            {listing?.PropertyDetails?.features.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Características
                </p>
                <div className="flex flex-wrap gap-2">
                  {listing?.PropertyDetails?.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Endereço */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Localização</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {listing?.Address?.street}, {listing?.Address?.number}
                    {listing?.Address?.complement &&
                      ` - ${listing?.Address?.complement}`}
                  </p>
                  <p className="text-muted-foreground">
                    {listing?.Address?.neighborhood}, {listing?.Address?.city} -{" "}
                    {listing?.Address?.state}
                  </p>
                  <p className="text-muted-foreground">
                    CEP: {listing?.Address?.cep}
                  </p>
                  {listing?.Address?.referencePoint && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Referência: {listing?.Address?.referencePoint}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações do Anunciante */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Anunciante</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{listing?.User?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{listing?.User?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{formatPhone(listing?.phone)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span>{formatPhone(listing?.whatsapp)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações Adicionais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Informações Adicionais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Disponível a partir de
                </p>
                <p className="font-medium">
                  {formatDate(listing?.availableFrom)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Anúncio criado em
                </p>
                <p className="font-medium">{formatDate(listing?.createdAt)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onReject(listing)}
              variant="destructive"
              className="flex-1 gap-2 cursor-pointer"
            >
              <X className="h-4 w-4" />
              Rejeitar Anúncio
            </Button>
            <Button
              onClick={() => onApprove(listing?.id)}
              className="flex-1  text-white gap-2 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              Aprovar Anúncio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
