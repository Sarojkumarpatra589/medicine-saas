import { useRoutes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout";

// Feature routes
import PublicRoutes from "../pages/public/routes";
import AuthRoutes from "../pages/auth/routes";
import DashboardRoutes from "../pages/dashboard/routes";
import InventoryRoutes from "../pages/inventory/routes";
import SalesRoutes from "../pages/sales/routes";
import CustomerRoutes from "../pages/customer/routes";
import SupplierRoutes from "../pages/supplier/routes";
import ReportsRoutes from "../pages/reports/routes";
import FinanceRoutes from "../pages/finance/routes";
import SettingsRoutes from "../pages/settings/routes";
import SubscriptionRoutes from "../pages/subscription/routes";
import DeveloperRoutes from "../pages/developer/routes";
import OnboardingRoutes from "../pages/onboarding/routes";
import StaffRoutes from "../pages/staff/routes";



export default function AppRoutes() {
  return useRoutes([
    {
      element: <AppLayout />,
      children: PublicRoutes, // 🌍 Landing page = "/"
    },
    {
      element: <AuthLayout />,
      children: AuthRoutes,
    },
    {
      element: <AppLayout />,
      children: [
        ...DashboardRoutes,
        ...InventoryRoutes, 
        ...SalesRoutes,
        ...CustomerRoutes,
        ...SupplierRoutes,
        ...ReportsRoutes,
        ...FinanceRoutes,
        ...SettingsRoutes,
        ...SubscriptionRoutes,
        ...DeveloperRoutes,
        ...OnboardingRoutes,
        ...StaffRoutes,
      ],
    },
  ]);
}
