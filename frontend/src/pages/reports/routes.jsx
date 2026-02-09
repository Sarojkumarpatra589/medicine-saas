import DashboardLayout from "../../components/layout/DashboardLayout";

import SalesReport from "./SalesReport";
import GSTReport from "./GSTReport";
import AuditReport from "./AuditReport";
import ExpiryLossReport from "./ExpiryLossReport";
import InventoryAnalytics from "./InventoryAnalytics";
import ReportDownload from "./ReportDownload";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 📊 REPORTS & ANALYTICS PAGES
      {
        path: ROUTES.SALES_REPORT,
        element: <SalesReport />,
      },
      {
        path: ROUTES.GST_REPORT,
        element: <GSTReport />,
      },
      {
        path: ROUTES.AUDIT_REPORT,
        element: <AuditReport />,
      },
      {
        path: ROUTES.EXPIRY_LOSS_REPORT,
        element: <ExpiryLossReport />,
      },
      {
        path: ROUTES.INVENTORY_ANALYTICS,
        element: <InventoryAnalytics />,
      },
      {
        path: ROUTES.REPORT_DOWNLOAD,
        element: <ReportDownload />,
      },
    ],
  },
];
