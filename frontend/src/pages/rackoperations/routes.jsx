import { ROUTES } from "../../constants/routes";

import RackDashboard from "./RackDashboard";
import RackList from "./RackList";
import RackForm from "./AddEditRack";
import ShelfManagement from "./ShelfManagement";
import RackLayout from "./RackLayout";
import MedicineRackAssignment from "./MedicineRackAssignment";
import RackInventory from "./RackInventory";
import RackExpiryAlerts from "./RackExpiryAlert";
import RackBarcodeGenerator from "./RackBarcodeGenerator";
import RackMovementHistory from "./RackMovementHistory";

const RackOperationsRoutes = [
  { path: ROUTES.RACK_DASHBOARD, element: <RackDashboard /> },
  { path: ROUTES.RACK_LIST, element: <RackList /> },
  { path: ROUTES.RACK_FORM, element: <RackForm /> },
  { path: ROUTES.SHELF_MANAGEMENT, element: <ShelfManagement /> },
  { path: ROUTES.RACK_LAYOUT, element: <RackLayout /> },
  { path: ROUTES.MEDICINE_RACK_ASSIGNMENT, element: <MedicineRackAssignment /> },
  { path: ROUTES.RACK_INVENTORY, element: <RackInventory /> },
  { path: ROUTES.RACK_EXPIRY_ALERTS, element: <RackExpiryAlerts /> },
  { path: ROUTES.RACK_BARCODE_GENERATOR, element: <RackBarcodeGenerator /> },
  { path: ROUTES.RACK_MOVEMENT_HISTORY, element: <RackMovementHistory /> },
];

export default RackOperationsRoutes;