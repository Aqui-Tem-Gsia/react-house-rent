import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function AdminDashboardLayout() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-2"></div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </div>
    </SidebarInset>
  );
}
