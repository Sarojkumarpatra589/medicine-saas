import { Outlet } from "react-router-dom";
import TopBarLayout from "./TopBarLayout";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="container-fluid">
      
      {/* Top Bar */}
      <TopBarLayout />

      {/* Main Body */}
      <div className="row" style={{ minHeight: "90vh" }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="col-10 p-4 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
