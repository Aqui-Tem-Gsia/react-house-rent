import axios from "axios";
import type { Listing } from "@/@types/admin/listing";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getPendingListings(): Promise<Listing[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<Listing[]>(`${apiUrl}/admin/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getListingById(listingId: string): Promise<Listing> {
  const token = localStorage.getItem("token");

  const response = await axios.get<Listing>(`${apiUrl}/listings/${listingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
