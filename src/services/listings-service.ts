import type { CreateListingAdminPayload } from "@/@types/admin/create-listing-admin";
import type { Listing } from "@/@types/admin/listing";
import { env } from "@/env";
import api from "@/interceptors/api";

const apiUrl = env.BASE_API;

export async function getPendingListings(): Promise<Listing[]> {
  const token = localStorage.getItem("token");

  const response = await api.get<Listing[]>(`${apiUrl}/admin/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getListingById(listingId: string): Promise<Listing> {
  const token = localStorage.getItem("token");

  const response = await api.get<Listing>(`${apiUrl}/listings/${listingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function approveListing(listingId: string) {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `${apiUrl}/admin/listings/${listingId}`,
    { status: "ACTIVE" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

// Rejeitar anúncio
export async function rejectListing(listingId: string, reason: string) {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `${apiUrl}/admin/listings/${listingId}`,
    {
      status: "BLOCKED",
      reason: reason,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function createListingAsAdmin(
  payload: CreateListingAdminPayload
): Promise<Listing> {
  const token = localStorage.getItem("token");

  const response = await api.post<Listing>(
    `${apiUrl}/admin/listings`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function uploadListingImages(
  listingId: string,
  images: File[]
): Promise<string[]> {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  images.forEach((file) => formData.append("images", file));

  const response = await api.post<string[]>(
    `${apiUrl}/listings/${listingId}/images`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
