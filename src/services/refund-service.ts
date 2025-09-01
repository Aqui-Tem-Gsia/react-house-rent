import type {
  RefundRequest,
  RefundRequestStatus,
} from '@/@types/admin/refund-request';
import { env } from '@/env';
import axios from 'axios';

const apiUrl = env.BASE_API;

export async function getRefundRequests(): Promise<RefundRequest[]> {
  const token = localStorage.getItem('token');

  const response = await axios.get<RefundRequest[]>(
    `${apiUrl}/admin/refund-requests`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateRefundRequestStatus(
  id: string,
  status: RefundRequestStatus
): Promise<RefundRequest[]> {
  const token = localStorage.getItem('token');

  const response = await axios.put<RefundRequest[]>(
    `${apiUrl}/admin/refund-requests/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
