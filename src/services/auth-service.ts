import { env } from '@/env';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const apiUrl = env.BASE_API;

export async function loginAdmin(data: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(`${apiUrl}/auth`, data);
  return response.data;
}
