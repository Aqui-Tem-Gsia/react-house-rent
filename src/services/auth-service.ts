import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";

export async function loginAdmin(data: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(`${apiUrl}/auth`, data);
  return response.data;
}
