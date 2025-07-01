import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token || !isAdmin(token)) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
