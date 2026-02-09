import DashboardLayout from "../../components/layout/DashboardLayout";

import MyProfile from "./MyProfile";
import CompanySetting from "./CompanySetting";
import StoreSetting from "./StoreSetting";
import UserRole from "./UserRole";
import AlertSetting from "./AlertSetting";
import InvoiceSetting from "./InvoiceSetting";
import IntegrationSetting from "./IntegrationSetting";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // ⚙️ SETTINGS PAGES
      {
        path: ROUTES.MY_PROFILE,
        element: <MyProfile />,
      },
      {
        path: ROUTES.COMPANY_SETTING,
        element: <CompanySetting />,
      },
      {
        path: ROUTES.STORE_SETTING,
        element: <StoreSetting />,
      },
      {
        path: ROUTES.USER_ROLE,
        element: <UserRole />,
      },
      {
        path: ROUTES.ALERT_SETTING,
        element: <AlertSetting />,
      },
      {
        path: ROUTES.INVOICE_SETTING,
        element: <InvoiceSetting />,
      },
      {
        path: ROUTES.INTEGRATION_SETTING,
        element: <IntegrationSetting />,
      },
    ],
  },
];
