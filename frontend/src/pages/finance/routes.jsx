import FinanceDashboard from "./FinanceDashboard";
import { ROUTES } from "../../constants/routes";

export default [
  {
    path: ROUTES.FINANCE,
    element: <FinanceDashboard />,
  },
];
