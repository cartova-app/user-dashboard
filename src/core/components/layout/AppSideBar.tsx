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
    <Sidebar collapsible="icon" className="border-r-0 bg-sidebar">
      {/* Header */}
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 items-center justify-between">
        <div className="flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center">
          <Logo className="h-8 w-auto group-data-[collapsible=icon]:hidden dark:brightness-0 dark:invert transition-all duration-300" />
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0 text-muted-foreground hover:text-foreground" />
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="
                        relative overflow-visible
                        h-10 w-full px-3
                        text-muted-foreground/80
                        transition-all duration-200 ease-in-out
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        data-[active=true]:bg-sidebar-accent 
                        data-[active=true]:text-[#5a6e00] dark:data-[active=true]:text-[#ecff77] 
                        data-[active=true]:font-bold
                        rounded-md
                        group/menu-button
                      "
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#5a6e00] dark:bg-[#ecff77] group-data-[collapsible=icon]:hidden" />
                        )}

                        {/* Icon */}
                        <item.icon
                          className={`size-5 shrink-0 transition-colors duration-200 ${isActive ? "text-[#5a6e00] dark:text-[#ecff77]" : "text-muted-foreground/80 group-hover:text-sidebar-accent-foreground"}`}
                        />

                        {/* Title */}
                        <span className="truncate group-data-[collapsible=icon]:hidden">
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
