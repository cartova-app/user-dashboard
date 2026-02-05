import { SidebarProvider } from "@/core/components/ui/sidebar";
import AppSidebar from "@/core/components/layout/AppSideBar";
import { TopNav } from "@/core/components/layout/TopNav";
import {
  Settings,
  LayoutDashboard,
  Box,
  ShoppingBag,
  UserRoundSearch,
  BarChart3,
  PenLine,
  Code2,
} from "lucide-react";
import { useParams, Outlet } from "react-router-dom";

export default function StoreLayout() {
  const { storeId } = useParams();

  // Menu items based on your image
  const items = [
    {
      title: "Dashboard",
      url: `/stores/${storeId}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: `/stores/${storeId}/products`,
      icon: Box,
    },
    {
      title: "Orders",
      url: `/stores/${storeId}/orders`,
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      url: `/stores/${storeId}/customers`,
      icon: UserRoundSearch, // Or Users
    },
    {
      title: "Analytics",
      url: `/stores/${storeId}/analytics`,
      icon: BarChart3,
    },
    {
      title: "Appearance",
      url: `/stores/${storeId}/appearance`,
      icon: PenLine,
    },
    {
      title: "Developer tools",
      url: `/stores/${storeId}/developer-tools`,
      icon: Code2,
    },
    {
      title: "Settings",
      url: `/stores/${storeId}/settings`,
      icon: Settings,
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="flex-1 min-w-0 bg-[#FCFCFC]">
        <TopNav />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
