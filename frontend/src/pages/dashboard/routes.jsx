// src/pages/dashboard/routes.js
import DashboardLayout from "../../components/layout/DashboardLayout";
import Dashboard from "./Dashboard";
import StaffDashboard from "./StaffDashboard";
import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.DASHBOARD_STAFF,
        element: <StaffDashboard />,
      },
    ],
  },
];