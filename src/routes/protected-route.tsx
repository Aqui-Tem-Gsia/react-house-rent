import { Navigate } from "react-router-dom";
import { isAdmin, getUserFromToken } from "../utils/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const payload = getUserFromToken(token);
  const isExpired = payload ? Date.now() >= payload.exp * 1000 : true;

  if (!isAdmin(token) || isExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
