import DashboardLayout from "../../components/layout/DashboardLayout";
import CustomerList from "./CustomerList";
import CustomerProfile from "./CustomerProfile";
import PrescriptionHistory from "./PrescriptionHistory";
import { ROUTES } from "../../constants/routes";
export default [
   {
      element: <DashboardLayout />,
      children: [
        
        // 👨‍💻 DEVELOPER PAGES
        {
          path: ROUTES.CUSTOMERLIST,
          element: <CustomerList />,
        },
        {
          path: ROUTES.CUSTOMERPROFILE,
          element: <CustomerProfile />,
        },
        {
          path: ROUTES.PRESSCRIPTIONHISTORY,
          element: <PrescriptionHistory />,
        },
      ],
    },
];
 


