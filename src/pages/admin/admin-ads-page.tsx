"use client";

import { usePendingListings } from "@/hooks/use-pending-listings";

import {
  Bed,
  Bath,
  Car,
  Calendar,
  Eye,
  Home,
  Building,
  MapPin,
  Search,
} from "lucide-react";

import { useMemo, useState } from "react";
import { formatDate, formatPrice } from "@/utils/format";
// import { ListingDetailsModal } from "@/components/admin/listing-details-modal";
// import { RejectReasonModal } from "@/components/admin/reject-reason-modal";
import type { Listing } from "@/@types/admin/listing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListingDetailsModal } from "@/components/admin/listing-details-modal";

export const AdminAdsPage = () => {
  const { data: listings = [], isLoading } = usePendingListings();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [listingToReject, setListingToReject] = useState<Listing | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) =>
      [listing.title, listing.Address.city, listing.Address.neighborhood]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [listings, searchTerm]);

  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  };

  const handleApproveListing = async (listingId: string) => {
    // chamada para backend
  };

  const handleRejectListing = (listing: Listing) => {
    setListingToReject(listing);
    setIsRejectModalOpen(true);
  };

  const confirmRejectListing = async (reason: string) => {
    if (!listingToReject) return;
    // chamada para backend com reason
    setIsRejectModalOpen(false);
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

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título, cidade ou bairro..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <p>Carregando anúncios...</p>
      ) : filteredListings.length === 0 ? (
        <Card>
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
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">
                    {listing.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    {listing.type === "SALE" ? "Venda" : "Aluguel"}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.Address.neighborhood}, {listing.Address.city}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {listing.description}
                </p>

                <div className="text-2xl font-bold text-[#912C21]">
                  {formatPrice(listing.price, listing.type)}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {listing.PropertyDetails.type === "HOUSE" ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      <Building className="h-4 w-4" />
                    )}
                    {listing.PropertyDetails.type === "HOUSE"
                      ? "Casa"
                      : "Apartamento"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {listing.PropertyDetails.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {listing.PropertyDetails.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    {listing.PropertyDetails.parkingSpots}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Criado em {formatDate(listing.createdAt)}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-medium">{listing.User.name}</p>
                      <p className="text-muted-foreground">
                        {listing.User.email}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleViewDetails(listing)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
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

      <ListingDetailsModal
        listing={selectedListing}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onApprove={handleApproveListing}
        onReject={handleRejectListing}
      />

      {/* <RejectReasonModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={confirmRejectListing}
        listingTitle={listingToReject?.title || ""}
      /> */}
    </div>
  );
};
