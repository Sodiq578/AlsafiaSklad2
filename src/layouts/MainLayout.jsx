import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
