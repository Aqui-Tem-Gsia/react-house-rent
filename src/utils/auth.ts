import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/@types/user-role";

interface JwtPayload {
  email: string;
  name: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export function getUserFromToken(token: string) {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isAdmin(token: string): boolean {
  const payload = getUserFromToken(token);
  return payload?.role === UserRole.ADMIN;
}
