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
    // Admin continua na tela de criação pra cadastrar o próximo; o anúncio
    // criado fica acessível pelo botão do toast.
    onSuccess: ({ listing, imagesFailed }) => {
      const action = {
        label: "Ver anúncio",
        onClick: () => navigate(`/listing/${listing.id}`),
      };

      if (imagesFailed) {
        toast.warning("Anúncio criado, mas as imagens não foram enviadas.", {
          action,
        });
      } else {
        toast.success("Anúncio criado com sucesso.", { action });
      }
    },
    onError: () => {
      toast.error("Não foi possível criar o anúncio.");
    },
  });
}
