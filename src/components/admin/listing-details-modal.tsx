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

interface ListingDetailsModalProps {
  listingId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (listingId: string) => void;
  onReject: (listingId: string) => void;
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{listing.title}</DialogTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">
                  {listing.type === "SALE" ? "Venda" : "Aluguel"}
                </Badge>
                <Badge variant="outline">
                  {listing.PropertyDetails.type === "HOUSE"
                    ? "Casa"
                    : "Apartamento"}
                </Badge>
              </div>
            </div>
            <div className="text-3xl font-bold text-[#912C21]">
              {formatPrice(listing.price, listing.type)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Descrição</h3>
            <p className="text-muted-foreground text-sm">
              {listing.description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Detail
              icon={<Square />}
              label="Área"
              value={`${listing.PropertyDetails.area}m²`}
            />
            <Detail
              icon={<Bed />}
              label="Quartos"
              value={listing.PropertyDetails.bedrooms}
            />
            <Detail
              icon={<Bath />}
              label="Banheiros"
              value={listing.PropertyDetails.bathrooms}
            />
            <Detail
              icon={<Car />}
              label="Vagas"
              value={listing.PropertyDetails.parkingSpots}
            />
          </div>

          {!!listing.PropertyDetails.features.length && (
            <div className="flex flex-wrap gap-2">
              {listing.PropertyDetails.features.map((f, i) => (
                <Badge key={i} variant="outline">
                  {f}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          <div>
            <h3 className="font-semibold">Localização</h3>
            <p className="text-sm text-muted-foreground">
              <MapPin className="inline mr-1" />
              {`${listing.Address.street}, ${listing.Address.number} - ${listing.Address.neighborhood}, ${listing.Address.city} - ${listing.Address.state}`}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold">Anunciante</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <User className="inline mr-1" />
                {listing.User.name}
              </p>
              <p>
                <Mail className="inline mr-1" />
                {listing.User.email}
              </p>
              <p>
                <Phone className="inline mr-1" />
                {formatPhone(listing.phone)}
              </p>
              <p>
                <MessageSquare className="inline mr-1" />
                {formatPhone(listing.whatsapp)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <Detail
              label="Disponível a partir de"
              value={formatDate(listing.availableFrom)}
            />
            <Detail label="Criado em" value={formatDate(listing.createdAt)} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onApprove(listing.id)}
              className="flex-1 bg-[#912C21] text-white"
            >
              <Check className="h-4 w-4 mr-2" /> Aprovar
            </Button>
            <Button
              onClick={() => onReject(listing.id)}
              variant="destructive"
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" /> Rejeitar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}
