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
      let imagesFailed = false;

      if (images.length > 0) {
        try {
          await uploadListingImages(listing.id, images);
        } catch {
          imagesFailed = true;
        }
      }

      return { listing, imagesFailed };
    },
    onSuccess: ({ listing, imagesFailed }) => {
      if (imagesFailed) {
        toast.warning("Anúncio criado, mas as imagens não foram enviadas.");
      } else {
        toast.success("Anúncio criado com sucesso.");
      }
      navigate(`/listing/${listing.id}`);
    },
    onError: () => {
      toast.error("Não foi possível criar o anúncio.");
    },
  });
}
