import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const OrganizationLayout = () => {
  return (
    <>
      <TopBar />
      <div className="container pt-8 pb-0 lg:py-16">
        <Outlet />
      </div>
    </>
  );
};

export default OrganizationLayout;
