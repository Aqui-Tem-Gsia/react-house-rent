import { useMemo } from "react";
import { getUserFromToken } from "@/utils/auth";

export function useAuthUser() {
  return useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return getUserFromToken(token);
  }, []);
}
