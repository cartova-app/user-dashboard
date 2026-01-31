import { SidebarProvider, SidebarTrigger } from "@core/components/ui/sidebar"
import AppSidebar from "@core/components/layout/AppSideBar"
import {
    Settings,
    Store,
    Users,
} from "lucide-react"

export default function StoreLayout({ children }) {
    // Menu items based on your image
    const items = [
        {
            title: "Stores",
            url: "#",
            icon: Store,
            isActive: true, // We'll use this to trigger the specific "Cartova" style
        },
        {
            title: "Team",
            url: "#",
            icon: Users,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ]

    return (
        <SidebarProvider>
            <AppSidebar
                items={items}
            />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}