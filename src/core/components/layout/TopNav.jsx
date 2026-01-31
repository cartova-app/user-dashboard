import {
    Bell,
    ChevronDown,
    User,
    UserCircle
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@core/components/ui/dropdown-menu";
import { Button } from "@core/components/ui/button";
import SearchInput from "../common/SearchInput";

export function TopNav() {
    return (
        <header className="flex h-24 items-center justify-between border-b bg-white px-6">
            {/* Left Side: Organization Switcher */}
            <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#EFFFF4]">
                    {/* Custom icon representing organization */}
                    <UserCircle className="size-5 text-[#10B981]" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 outline-none">
                            Seif sweilam&apos;s <span className="font-normal text-slate-500 ml-1">Organization</span>
                            <ChevronDown className="ml-1 size-4 text-slate-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem>Personal Workspace</DropdownMenuItem>
                        <DropdownMenuItem>Engineering Team</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Right Side: Utilities */}
            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <SearchInput
                    placeholder="Search..."
                    className="bg-[#FCFCFC]"
                />
                {/* Action Icons */}
                <div className="flex items-center gap-4">
                    {/* Notification with Badge */}
                    <Button variant="ghost" size="icon" className="relative text-slate-600">
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
                    <Button variant="ghost" size="icon" className="text-slate-600">
                        <User className="size-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}