import DashboardLayout from "../../components/layout/DashboardLayout";

import SupplierList from "./SupplierList";
import SupplierForm from "./SupplierForm";
import PurchaseOrder from "./PurchaseOrder";
import PurchaseInvoice from "./PurchaseInvoice";
import SupplierPayments from "./SupplierPayments";
import PurchaseReturn from "./PurchaseReturn";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 🚚 SUPPLIER PAGES
      {
        path: ROUTES.SUPPLIER_LIST,
        element: <SupplierList />,
      },
      {
        path: ROUTES.SUPPLIER_FORM,
        element: <SupplierForm />,
      },
      {
        path: ROUTES.PURCHASE_ORDER,
        element: <PurchaseOrder />,
      },
      {
        path: ROUTES.PURCHASE_INVOICE,
        element: <PurchaseInvoice />,
      },
      {
        path: ROUTES.SUPPLIER_PAYMENTS,
        element: <SupplierPayments />,
      },
      {
        path: ROUTES.PURCHASE_RETURN,
        element: <PurchaseReturn />,
      },
    ],
  },
];
