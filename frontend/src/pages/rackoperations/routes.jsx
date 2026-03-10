import DashboardLayout from "../../components/layout/DashboardLayout";

import RackDashboard from "./RackDashboard";
import MedicineRackAssignment from "./MedicineRackAssignment";
import RackView from "./RackView";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 📦 RACK MANAGEMENT PAGES
      {
        path: ROUTES.RACK_DASHBOARD,
        element: <RackDashboard />,
      },
      {
        path: ROUTES.MEDICINE_RACK_ASSIGNMENT,
        element: <MedicineRackAssignment />,
      },
      {
        path: ROUTES.RACK_VIEW,
        element: <RackView />,
      },
    ],
  },
];