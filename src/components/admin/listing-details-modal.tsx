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

  if (!listingId || !listing) return null;

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-[60%] p-2 lg:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">{listing.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="cursor-pointer">
                  {listing.type}
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  {listing.type}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Slider de Imagens */}
          {listing.images && listing.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 cursor-pointer">
                Fotos do Imóvel
              </h3>
              <ImageGallery images={listing.images} title={listing.title} />
            </div>
          )}

          {/* Preço */}
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-[#912C21]">
              {formatPrice(listing.price, listing.type)}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="text-lg font-semibold mb-2 cursor-pointer">
              Descrição
            </h3>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <Separator />

          {/* Detalhes do Imóvel */}
          <div>
            <h3 className="text-lg font-semibold mb-4 cursor-pointer">
              Detalhes do Imóvel
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <Square className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium">{listing.area}m²</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Quartos</p>
                  <p className="font-medium">{listing.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Banheiros</p>
                  <p className="font-medium">{listing.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Vagas</p>
                  <p className="font-medium">{listing.parkingSpots}</p>
                </div>
              </div>
            </div>

            {listing.features.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2 cursor-pointer">
                  Características
                </p>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer"
                    >
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
            <h3 className="text-lg font-semibold mb-4 cursor-pointer">
              Localização
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 cursor-pointer">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {listing.address.street}, {listing.address.number}
                    {listing.address.complement &&
                      ` - ${listing.address.complement}`}
                  </p>
                  <p className="text-muted-foreground">
                    {listing.address.neighborhood}, {listing.address.city} -{" "}
                    {listing.address.state}
                  </p>
                  <p className="text-muted-foreground">
                    CEP: {listing.address.cep}
                  </p>
                  {listing.address.referencePoint && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Referência: {listing.address.referencePoint}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações do Anunciante */}
          <div>
            <h3 className="text-lg font-semibold mb-4 cursor-pointer">
              Anunciante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{listing.user?.name ?? "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{listing.user?.email ?? "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{formatPhone(listing.phone)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{formatPhone(listing.whatsapp)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações Adicionais */}
          <div>
            <h3 className="text-lg font-semibold mb-4 cursor-pointer">
              Informações Adicionais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Disponível a partir de
                </p>
                <p className="font-medium">
                  {formatDate(listing.availableFrom)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Anúncio criado em
                </p>
                <p className="font-medium">{formatDate(listing.createdAt)}</p>
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
              onClick={() => onApprove(listing.id)}
              className="flex-1 text-white gap-2 cursor-pointer"
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
