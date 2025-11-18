import { env } from '@/env';
import api from '@/interceptors/api';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const apiUrl = env.BASE_API;

export async function loginAdmin(data: LoginPayload): Promise<LoginResponse> {
  const response = await api.post(`${apiUrl}/auth`, data);
  return response.data;
}

export async function resetPassword(newPassword: string, token: string) {
  return api
    .post(
      `${apiUrl}/auth/reset-password`,
      { newPassword },
      { params: { token } }
    )
    .then((response) => response.data);
}
