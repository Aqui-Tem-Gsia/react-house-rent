import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { CreateListingAdminPayload } from "@/@types/admin/create-listing-admin";
import {
  createListingAsAdmin,
  uploadListingImages,
} from "@/services/listings-service";

interface CreateAdInput {
  payload: CreateListingAdminPayload;
  images: File[];
}

export function useCreateAd() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ payload, images }: CreateAdInput) => {
      const listing = await createListingAsAdmin(payload);

      if (images.length > 0) {
        await uploadListingImages(listing.id, images);
      }

      return listing;
    },
    onSuccess: () => {
      toast.success("Anúncio criado com sucesso.");
      navigate("/admin/ads");
    },
    onError: () => {
      toast.error("Não foi possível criar o anúncio.");
    },
  });
}
