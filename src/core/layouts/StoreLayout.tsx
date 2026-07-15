import {
  BarChart3,
  Box,
  Code2,
  FolderTree,
  LayoutDashboard,
  PenLine,
  Settings,
  ShoppingBag,
  UserRoundSearch,
} from 'lucide-react';
import { Outlet, useParams } from 'react-router-dom';
import AppSidebar from '@/core/components/layout/AppSideBar';
import { TopNav } from '@/core/components/layout/TopNav';
import { SidebarProvider } from '@/core/components/ui/sidebar';

import { CartovaAssistantSidebar } from '@/feature/assistant/components/CartovaAssistantSidebar';

export default function StoreLayout() {
  const { storeId } = useParams();

  // Menu items based on your image
  const items = [
    {
      title: 'Dashboard',
      url: `/stores/${storeId}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      url: `/stores/${storeId}/products`,
      icon: Box,
    },
    {
      title: 'Categories',
      url: `/stores/${storeId}/categories`,
      icon: FolderTree,
    },
    {
      title: 'Orders',
      url: `/stores/${storeId}/orders`,
      icon: ShoppingBag,
    },
    {
      title: 'Customers',
      url: `/stores/${storeId}/customers`,
      icon: UserRoundSearch, // Or Users
    },
    {
      title: 'Analytics',
      url: `/stores/${storeId}/analytics`,
      icon: BarChart3,
    },
    {
      title: 'Appearance',
      url: `/stores/${storeId}/appearance`,
      icon: PenLine,
    },
    {
      title: 'Developer tools',
      url: `/stores/${storeId}/developer-tools`,
      icon: Code2,
    },
    {
      title: 'Settings',
      url: `/stores/${storeId}/settings`,
      icon: Settings,
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <div className="flex flex-1 min-w-0">
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <TopNav />
          <Outlet />
        </main>
        <CartovaAssistantSidebar />
      </div>
    </SidebarProvider>
  );
}
