"use client";

import { Home, LogOut, Megaphone } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../../assets/images/logo-aqui-tem.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import { usePendingListings } from "@/hooks/use-pending-listings";

// Menu items
interface SidebarItem {
  title: string;
  url?: string;
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
}

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Anúncios",
    url: "/admin/ads",
    icon: Megaphone,
  },
];

const settingsItems: SidebarItem[] = [
  {
    title: "Sair",
    icon: LogOut,
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthUser();

  const { data: listings = [] } = usePendingListings();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
    toast.success("Logout efetuado com sucesso.");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div>
            <img src={logo} alt="Logo Aqui Tem" className="size-10" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Aqui Tem</span>
            <span className="truncate text-xs text-muted-foreground">
              Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname.startsWith(item.url || "")
                        ? "bg-[#912C21] text-white hover:bg-[#912C21] hover:text-white "
                        : "text-muted-foreground hover:bg-muted"
                    }
                  >
                    <Link
                      to={item.url || ""}
                      className="flex justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </div>

                      {item.title === "Anúncios" && listings.length > 0 && (
                        <span className="ml-2 text-xs bg-[#ff2929] text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {listings.length}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={item.title === "Sair" ? handleLogout : undefined}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name ?? "-"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email ?? "-"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
