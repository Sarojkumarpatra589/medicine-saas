import { ROUTES } from "../../constants/routes";
import RackSettings from "./RackSettings";
import RackCategoryMapping from "./RackCategoryMapping";
import RackBarcodeSettings from "./RackBarcodeSettings";
import RackAlertSettings from "./RackAlertSettings";
import RackLayoutSettings from "./RackLayoutSettings";

const RackSettingsRoutes = [
  { path: ROUTES.RACK_SETTINGS, element: <RackSettings /> },
  { path: ROUTES.RACK_CATEGORY_MAPPING, element: <RackCategoryMapping /> },
  { path: ROUTES.RACK_BARCODE_SETTINGS, element: <RackBarcodeSettings /> },
  { path: ROUTES.RACK_ALERT_SETTINGS, element: <RackAlertSettings /> },
  { path: ROUTES.RACK_LAYOUT_SETTINGS, element: <RackLayoutSettings /> },
];

export default RackSettingsRoutes;