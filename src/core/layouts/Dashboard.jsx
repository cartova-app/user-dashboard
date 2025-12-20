import React from "react";
import { Outlet } from "react-router-dom";
import {
    Gauge, Boxes, Handbag, User, Banknote, ChartSpline, PencilLine, BrainCircuit, Settings
} from "lucide-react";
import Logo from "@assets/icons/logo.svg?react";
const Sidebar = () => {
    const navItems = [
        { name: "Dashboard", icon: Gauge },
        { name: "Products", icon: Boxes },
        { name: "Orders", icon: Handbag },
        { name: "Customers", icon: User },
        { name: "Marketing", icon: Banknote },
        { name: "Analytics", icon: ChartSpline },
        { name: "Appearance", icon: PencilLine },
        { name: "Developer tools", icon: BrainCircuit },
        { name: "Settings", icon: Settings },
    ];

    return (
        <aside className="w-72 bg-white min-h-screen border-r p-6 hidden md:block">
            <div className="flex items-center gap-3 mb-8">
                {/* Logo */}
                {/* <Link href="/" className="flex items-center gap-2"> */}
                <div className="relative w-[11.6rem] h-12">
                    <Logo className="object-contain" />
                </div>
                {/* </Link> */}
            </div>

            <nav className="space-y-2 text-sm text-gray-700">
                {navItems.map(({ name, icon: Icon }) => (
                    <div key={name} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>{name}</div>
                    </div>
                ))}
            </nav>

            <div className="mt-8">
                <div className="h-32 w-full border-dashed border-2 border-gray-200 rounded" />
                <div className="text-xs text-gray-400 mt-2">Drop widget here</div>
            </div>
        </aside>
    );
};

const Topbar = () => (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b">
        <div className="flex items-center gap-4">
            <div className="relative w-80">
                <input
                    className="w-full border rounded-md px-4 py-2 text-sm bg-gray-50"
                    placeholder="Search...."
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <button className="text-sm px-3 py-2 rounded bg-gray-50">EN</button>
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
    </header>
);



const Dashboard = () => {

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Topbar />

                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;