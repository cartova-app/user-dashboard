import { SidebarProvider } from "@core/components/ui/sidebar"
import AppSidebar from "@core/components/layout/AppSideBar"
import {
    Settings,
    Store,
    Users,
} from "lucide-react"
import { useParams, Outlet } from "react-router-dom"
import { TopNav } from "../components/layout/TopNav"

export default function OrganizationsLayout() {
    const { id } = useParams()

    const items = [
        {
            title: "Stores",
            url: `/organizations/${id}/stores`,
            icon: Store,
        },
        {
            title: "Team",
            url: `/organizations/${id}/team`,
            icon: Users,
        },
        {
            title: "Settings",
            url: `/organizations/${id}/settings`,
            icon: Settings,
        },
    ]

    return (
        <SidebarProvider>
            <AppSidebar
                items={items}
            />
            <main className="flex-1 min-w-0 bg-[#FCFCFC]">
                <TopNav />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}