import DashboardLayout from "../../components/layout/DashboardLayout";
import Saroj from "./Saroj";
import Banita from "./Banita";
import Sarmistha from "./Sarmistha";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      
      // 👨‍💻 DEVELOPER PAGES
      {
        path: ROUTES.SAROJ,
        element: <Saroj />,
      },
      {
        path: ROUTES.BANITA,
        element: <Banita />,
      },
      {
        path: ROUTES.SARMISTHA,
        element: <Sarmistha />,
      },
    ],
  },
];
