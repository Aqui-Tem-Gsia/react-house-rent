import type {
  RefundRequest,
  RefundRequestStatus,
} from "@/@types/admin/refund-request";
import { env } from "@/env";
import api from "@/interceptors/api";

const apiUrl = env.BASE_API;

export async function getRefundRequests(): Promise<RefundRequest[]> {
  const token = localStorage.getItem("token");

  const response = await api.get<RefundRequest[]>(
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
  const token = localStorage.getItem("token");

  const response = await api.put<RefundRequest[]>(
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
