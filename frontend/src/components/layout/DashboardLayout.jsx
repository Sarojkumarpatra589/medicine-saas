import { Outlet } from "react-router-dom";
import TopBarLayout from "./TopBarLayout";
import Sidebar from "./Sidebar";
import "./styles.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-root">
      {/* Top Bar */}
      <TopBarLayout />

      {/* Body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}