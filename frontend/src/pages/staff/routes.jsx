import DashboardLayout from "../../components/layout/DashboardLayout";

import StaffManagement from "./StaffManagement";
import RolePermissions from "./RolePermissions";
import Attendance from "./Attendance";
import ActivityLogs from "./ActivityLogs";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.STAFF_MANAGEMENT,
        element: <StaffManagement />,
      },
      {
        path: ROUTES.ROLE_PERMISSIONS,
        element: <RolePermissions />,
      },
      {
        path: ROUTES.STAFF_ATTENDANCE,
        element: <Attendance />,
      },
      {
        path: ROUTES.ACTIVITY_LOGS,
        element: <ActivityLogs />,
      },
    ],
  },
];
