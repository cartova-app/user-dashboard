import { Bell, ChevronDown, LogOut, Settings, User, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Button } from "@/core/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import authClient from "@/core/config/auth-client";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function TopNav() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: organizations } = authClient.useListOrganizations();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const setActiveOrganization = async (id: string) => {
    await authClient.organization.setActive({
      organizationId: id,
    });
    navigate(`/`);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-24 items-center justify-between border-b bg-white px-6">
      {/* Left Side: Organization Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-[#EFFFF4]">
          {/* Custom icon representing organization */}
          <UserCircle className="size-5 text-[#10B981]" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 outline-none">
              {activeOrganization?.name}
              <ChevronDown className="ml-1 size-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {organizations?.map((org) => {
              const isActive = org.id === activeOrganization?.id;
              return (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => !isActive && setActiveOrganization(org.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 cursor-pointer ${isActive ? "" : "text-slate-600"
                    }`}
                >
                  <span className="truncate">{org.name}</span>
                  {isActive && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-lime-100 text-lime-700 hover:bg-lime-100 border-none text-[10px] h-5 px-1.5 font-bold uppercase tracking-tight"
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
        <SearchInput
          placeholder="Search..."
          className="bg-[#FCFCFC]"
          value={searchValue}
          onChange={setSearchValue}
        />
        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Notification with Badge */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
            </span>
          </Button>

          {/* Language / Region */}
          <span className="cursor-pointer text-sm font-medium text-slate-600 hover:text-black">
            EN
          </span>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600">
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
