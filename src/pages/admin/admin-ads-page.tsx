"use client";

import { usePendingListings } from "@/hooks/use-pending-listings";

import {
  Bed,
  Bath,
  Car,
  Calendar,
  Eye,
  Home,
  MapPin,
  Search,
} from "lucide-react";

import { useMemo, useState } from "react";
import { formatDate, formatPrice } from "@/utils/format";
import type { Listing } from "@/@types/admin/listing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListingDetailsModal } from "@/components/admin/listing-details-modal";
import { RejectReasonModal } from "@/components/admin/reject-reason-modal";
import {
  useApproveListing,
  useRejectListing,
} from "@/hooks/use-review-listing";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getPropertyTypeTranslation } from "@/utils/getPropertyTypeTranslation";

export const AdminAdsPage = () => {
  const { data: listings = [], isLoading } = usePendingListings();

  console.log(listings);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [listingToReject, setListingToReject] = useState<Listing | null>(null);

  const queryClient = useQueryClient();

  const filteredListings = useMemo(() => {
    return listings.filter((listing) =>
      [listing.title, listing.address.city, listing.address.neighborhood]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [listings, searchTerm]);

  const { mutate: approveListingMutation, isPending: isApproving } =
    useApproveListing();
  const { mutate: rejectListingMutation, isPending: isRejecting } =
    useRejectListing();

  const handleApproveListing = (listingId: string) => {
    approveListingMutation(listingId, {
      onSuccess: () => {
        toast.success("Anúncio aprovado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["pending-listings"] });
        setIsDetailsModalOpen(false);
      },
    });
  };

  const handleRejectListing = (listing: Listing) => {
    setListingToReject(listing);
    setIsRejectModalOpen(true);
  };

  const confirmRejectListing = async (reason: string) => {
    if (!listingToReject) return;

    rejectListingMutation(
      { listingId: listingToReject.id, reason },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pending-listings"] });
          setIsRejectModalOpen(false);
          setIsDetailsModalOpen(false);
        },
      }
    );
  };

  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-3 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Anúncios Pendentes</h1>
            <p className="text-muted-foreground">
              {filteredListings.length} anúncios aguardando aprovação
            </p>
          </div>
        </div>

        <div className="relative max-w-md cursor-pointer">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título, cidade ou bairro..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="pl-10 cursor-pointer"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-256px)]">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="pt-0">
                <div className="relative h-48 w-full">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 mt-2 rounded" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-8 w-1/3 rounded" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-4 w-10 rounded" />
                  </div>
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <Card className="cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">
                  Nenhum anúncio encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Tente ajustar os filtros de busca"
                    : "Não há anúncios pendentes no momento"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="hover:shadow-lg  transition-shadow overflow-hidden pt-0 cursor-pointer"
              >
                {/* Imagem do Card */}
                <div className="relative h-48 overflow-hidden cursor-pointer">
                  <img
                    src={
                      listing.images[0] ||
                      "https://storage.googleapis.com/star-lab/blog/OGs/image-not-found.png"
                    }
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-black"
                    >
                      {listing.type === "SALE" ? "Venda" : "Aluguel"}
                    </Badge>
                  </div>
                  {listing?.images?.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{listing.images.length - 1} fotos
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">
                      {listing.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.address.neighborhood}, {listing.address.city}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 cursor-pointer">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {listing.description}
                  </p>

                  <div className="text-2xl font-bold text-[#912C21]">
                    {formatPrice(listing.price, listing.type)}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      {getPropertyTypeTranslation(listing.propertyType)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {listing.bedrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {listing.bathrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      {listing.parkingSpots}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Criado em {formatDate(listing.createdAt)}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex flex-col lg:flex-row items-center  gap-4 justify-between">
                      <div className="text-sm w-full ">
                        <p className="font-medium">{listing.user.name}</p>
                        <p className="text-muted-foreground">
                          {listing.user.email}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleViewDetails(listing)}
                        variant="outline"
                        size="sm"
                        className="gap-2 cursor-pointer w-full lg:w-[130px]"
                      >
                        <Eye className="h-4 w-4" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ListingDetailsModal
        listingId={selectedListing?.id ?? null}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onApprove={handleApproveListing}
        onReject={handleRejectListing}
        isSubmitting={isApproving}
      />

      <RejectReasonModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={confirmRejectListing}
        listingTitle={listingToReject?.title || ""}
        isSubmitting={isRejecting}
      />
    </div>
  );
};
