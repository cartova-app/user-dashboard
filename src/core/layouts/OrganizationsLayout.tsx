import { SidebarProvider } from "@/core/components/ui/sidebar";
import AppSidebar from "@/core/components/layout/AppSideBar";
import { Settings, Store, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { TopNav } from "../components/layout/TopNav";

export default function OrganizationsLayout() {
  const items = [
    {
      title: "Stores",
      url: `/stores`,
      icon: Store,
    },
    {
      title: "Team",
      url: `/team`,
      icon: Users,
    },
    {
      title: "Settings",
      url: `/settings`,
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="flex-1 min-w-0 bg-background">
        <TopNav />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
