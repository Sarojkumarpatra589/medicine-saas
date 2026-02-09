import DashboardLayout from "../../components/layout/DashboardLayout";

import SalesList from "./SalesList";
import InvoiceList from "./InvoiceList";
import InvoiceView from "./InvoiceView";
import POSBilling from "./POSBilling";
import PaymentHistory from "./PaymentHistory";
import SalesReturn from "./SalesReturn";
import Refunds from "./Refunds";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 💰 SALES PAGES
      {
        path: ROUTES.SALES_LIST,
        element: <SalesList />,
      },
      {
        path: ROUTES.INVOICE_LIST,
        element: <InvoiceList />,
      },
      {
        path: ROUTES.INVOICE_VIEW,
        element: <InvoiceView />,
      },
      {
        path: ROUTES.POS_BILLING,
        element: <POSBilling />,
      },
      {
        path: ROUTES.PAYMENT_HISTORY,
        element: <PaymentHistory />,
      },
      {
        path: ROUTES.SALES_RETURN,
        element: <SalesReturn />,
      },
      {
        path: ROUTES.REFUNDS,
        element: <Refunds />,
      },
    ],
  },
];
