import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/core/components/ui/sidebar";

import Logo from "@/assets/icons/logo.svg?react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface AppSidebarProps {
  items?: NavItem[];
}

function AppSidebar({ items = [] }: AppSidebarProps) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-[#F4F4F5]">
      {/* Header */}
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
          <Logo className="group-data-[collapsible=icon]:hidden" />
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="
                                                relative overflow-visible
                                                h-12 w-full px-4
                                                text-gray-500 transition-all duration-200
                                                hover:bg-gray-200/50 hover:text-black
                                                data-[active=true]:bg-white
                                                data-[active=true]:text-black
                                                data-[active=true]:shadow-sm
                                            "
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary group-data-[collapsible=icon]:hidden" />
                        )}

                        {/* Icon */}
                        <item.icon
                          className={`size-5 shrink-0 ${isActive ? "text-black" : "text-gray-400"}`}
                        />

                        {/* Title */}
                        <span className="font-medium truncate group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
