import { Outlet } from "react-router"
import TopBar from "../components/TopBar"

const OrganizationLayout = () => {
    return (
        <>
            <TopBar />
            <div className="container mx-auto space-y-10 py-6">

                <Outlet />
            </div>
        </>
    )
}

export default OrganizationLayout