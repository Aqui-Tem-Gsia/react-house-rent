import type {
  RefundRequest,
  RefundRequestStatus,
} from '@/@types/admin/refund-request';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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
