import { Settings, Store, Users } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/core/components/layout/AppSideBar';
import { SidebarProvider } from '@/core/components/ui/sidebar';
import { TopNav } from '../components/layout/TopNav';

export default function OrganizationsLayout() {
  const items = [
    {
      title: 'Stores',
      url: `/stores`,
      icon: Store,
    },
    {
      title: 'Team',
      url: `/team`,
      icon: Users,
    },
    {
      title: 'Settings',
      url: `/settings`,
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="flex-1 min-w-0 bg-background px-6">
        <TopNav />
        <div className="py-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
