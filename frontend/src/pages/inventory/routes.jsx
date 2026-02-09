import DashboardLayout from "../../components/layout/DashboardLayout";

import InventoryList from "./InventoryList";
import MedicineList from "./MedicineList";
import MedicineAdd from "./MedicineAdd";
import BatchManagement from "./BatchManagement";
import BarcodeManager from "./BarcodeManager";
import ExpiryTracking from "./ExpiryTracking";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      // 💊 INVENTORY PAGES
      {
        path: ROUTES.INVENTORY_LIST,
        element: <InventoryList />,
      },
      {
        path: ROUTES.MEDICINE_LIST,
        element: <MedicineList />,
      },
      {
        path: ROUTES.MEDICINE_ADD,
        element: <MedicineAdd />,
      },
      {
        path: ROUTES.BATCH_MANAGEMENT,
        element: <BatchManagement />,
      },
      {
        path: ROUTES.BARCODE_MANAGER,
        element: <BarcodeManager />,
      },
      {
        path: ROUTES.EXPIRY_TRACKING,
        element: <ExpiryTracking />,
      },
    ],
  },
];
