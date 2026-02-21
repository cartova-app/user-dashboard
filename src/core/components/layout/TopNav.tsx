import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  UserCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { Button } from '@/core/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '../ui/badge';
import { ThemeToggle } from '../common/ThemeToggle';
import authClient from '@/core/config/auth-client';

export function TopNav() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: organizations } = authClient.useListOrganizations();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setActiveOrganization = async (id: string) => {
    await authClient.organization.setActive({ organizationId: id });
    await queryClient.invalidateQueries();
    navigate('/stores');
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex h-24 items-center justify-between border-b bg-background px-6">
      {/* Left Side: Organization Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
          {/* Custom icon representing organization */}
          <UserCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-semibold text-foreground outline-none">
              {activeOrganization?.name}
              <ChevronDown className="ml-1 size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {organizations?.map((org) => {
              const isActive = org.id === activeOrganization?.id;
              return (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => !isActive && setActiveOrganization(org.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 cursor-pointer ${
                    isActive ? '' : 'text-muted-foreground'
                  }`}
                >
                  <span className="truncate">{org.name}</span>
                  {isActive && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 border-none text-[10px] h-5 px-1.5 font-bold uppercase tracking-tight"
                      >
                        Active
                      </Badge>
                    </div>
                  )}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuItem>
              <Link to="/organizations">Manage Organizations</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Side: Utilities */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Notification with Badge */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
            </span>
          </Button>

          {/* Language / Region */}
          <span className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
            EN
          </span>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
