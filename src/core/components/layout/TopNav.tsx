import { useQuery } from '@tanstack/react-query';
import { Bell, ChevronDown, LogOut, Settings, Store, User, UserCircle } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/core/components/ui/sidebar';
import authClient from '@/core/config/auth-client';
import { storeListQueryOptions } from '@/feature/store/api/storeQueryDefinitions';
import { ThemeToggle } from '../common/ThemeToggle';
import { Badge } from '../ui/badge';

export function TopNav() {
  const { storeId } = useParams<{ storeId?: string }>();
  const location = useLocation();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: organizations } = authClient.useListOrganizations();
  const { refetch: refetchSession } = authClient.useSession();
  const { data: storesData } = useQuery({
    ...storeListQueryOptions(),
    enabled: Boolean(storeId),
  });
  const navigate = useNavigate();

  const stores = storesData?.items ?? [];
  const activeStore = stores.find((store) => store.id === storeId);

  const setActiveOrganization = async (id: string) => {
    await authClient.organization.setActive({ organizationId: id });
    await refetchSession();
    navigate('/stores', { replace: true });
  };

  const setActiveStore = (id: string) => {
    if (!storeId) return;

    const storeBasePath = `/stores/${storeId}`;
    const currentSubPath = location.pathname.startsWith(storeBasePath)
      ? location.pathname.slice(storeBasePath.length)
      : '';
    const nextPath = `/stores/${id}${currentSubPath || '/dashboard'}`;

    navigate(nextPath, { replace: true });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 md:h-24 items-center justify-between border-b bg-background px-3 md:px-6">
      {/* Left Side: Organization Switcher */}
      <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
        <SidebarTrigger aria-label="Open navigation" className="shrink-0 md:hidden" />
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
          {/* Custom icon representing organization */}
          <UserCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="flex min-w-0 items-center gap-1">
          <Link
            to="/stores"
            className="truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {activeOrganization?.name}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Switch organization"
              >
                <ChevronDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {organizations?.map((org) => {
                const isActive = org.id === activeOrganization?.id;
                return (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => !isActive && setActiveOrganization(org.id)}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 ${
                      isActive ? '' : 'text-muted-foreground'
                    }`}
                  >
                    <span className="truncate">{org.name}</span>
                    {isActive && (
                      <Badge
                        variant="secondary"
                        className="h-5 border-none bg-lime-100 px-1.5 text-[10px] font-bold uppercase tracking-tight text-lime-700 dark:bg-lime-900/30 dark:text-lime-400"
                      >
                        Active
                      </Badge>
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem asChild>
                <Link to="/organizations">Manage Organizations</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {storeId && (
          <>
            <div className="mx-2 h-5 w-px bg-border" />
            <div className="flex size-9 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50">
              <Store className="size-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="flex items-center gap-1">
              <Link
                to={`/stores/${storeId}/dashboard`}
                className="max-w-[8rem] truncate text-sm font-semibold text-foreground transition-colors hover:text-primary sm:max-w-48"
              >
                {activeStore?.name ?? 'Store'}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground"
                    aria-label="Switch store"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {stores.map((store) => {
                    const isActive = store.id === storeId;
                    return (
                      <DropdownMenuItem
                        key={store.id}
                        onClick={() => !isActive && setActiveStore(store.id)}
                        className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 ${
                          isActive ? '' : 'text-muted-foreground'
                        }`}
                      >
                        <span className="truncate">{store.name}</span>
                        {isActive && (
                          <Badge
                            variant="secondary"
                            className="h-5 border-none bg-lime-100 px-1.5 text-[10px] font-bold uppercase tracking-tight text-lime-700 dark:bg-lime-900/30 dark:text-lime-400"
                          >
                            Active
                          </Badge>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuItem asChild>
                    <Link to="/stores">Manage Stores</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Right Side: Utilities */}
      <div className="flex shrink-0 items-center gap-2 md:gap-6">
        {/* Search Bar */}
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification with Badge */}
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
            </span>
          </Button>

          {/* Language / Region */}
          <span className="hidden cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">
            EN
          </span>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
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
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
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
