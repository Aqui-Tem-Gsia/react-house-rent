import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboardLayout } from "@/layouts/admin-dashboard-layout";
import { isAdmin } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !isAdmin(token)) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <AdminDashboardLayout />
      </div>
    </SidebarProvider>
  );
};
