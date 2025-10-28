import { env } from "@/env";
import api from "@/interceptors/api";

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
