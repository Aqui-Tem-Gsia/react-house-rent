import type { Listing } from '@/@types/admin/listing';
import { env } from '@/env';
import axios from 'axios';

const apiUrl = env.BASE_API;

export async function getPendingListings(): Promise<Listing[]> {
  const token = localStorage.getItem('token');

  const response = await axios.get<Listing[]>(`${apiUrl}/admin/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getListingById(listingId: string): Promise<Listing> {
  const token = localStorage.getItem('token');

  const response = await axios.get<Listing>(`${apiUrl}/listings/${listingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function approveListing(listingId: string) {
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${apiUrl}/admin/listings/${listingId}`,
    { status: 'ACTIVE' },
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
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${apiUrl}/admin/listings/${listingId}`,
    {
      status: 'BLOCKED',
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
