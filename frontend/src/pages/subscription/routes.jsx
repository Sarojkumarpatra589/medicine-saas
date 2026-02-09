import DashboardLayout from "../../components/layout/DashboardLayout";

import MySubscription from "./MySubscription";
import Plan from "./Plans";
import UpgradePlan from "./UpgradePlan";
import BillingHistory from "./BillingHistory";
import InvoiceView from "./InvoiveView"; // ⚠️ filename has typo, keep as-is if not renamed

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 🧩 SUBSCRIPTION & PLANS PAGES
      {
        path: ROUTES.MY_SUBSCRIPTION,
        element: <MySubscription />,
      },
      {
        path: ROUTES.PLAN,
        element: <Plan />,
      },
      {
        path: ROUTES.UPGRADE_PLAN,
        element: <UpgradePlan />,
      },
      {
        path: ROUTES.SUBSCRIPTION_INVOICE_VIEW,
        element: <InvoiceView />,
      },
      {
        path: ROUTES.BILLING_HISTORY,
        element: <BillingHistory />,
      },
    ],
  },
];
