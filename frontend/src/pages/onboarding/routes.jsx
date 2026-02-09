import LincenceGst from "./LincenceGst";
import OwnerDetails from "./OwnerDetails";
import StoreDetails from "./StoreDetails";
import StoreConfig from "./StoreConfig";
import SubsciptionPlan from "./SubsciptionPlan";
import Success from "./Success";

import { ROUTES } from "../../constants/routes";

export default [
  {
    path: ROUTES.LICENCE_GST,
    element: <LincenceGst />,
  },
  {
    path: ROUTES.OWNER_DETAILS,
    element: <OwnerDetails />,
  },
  {
    path: ROUTES.STORE_DETAILS,
    element: <StoreDetails />,
  },
  {
    path: ROUTES.STORE_CONFIG,
    element: <StoreConfig />,
  },
  {
    path: ROUTES.SUBSCRIPTION_PLAN,
    element: <SubsciptionPlan />,
  },
  {
    path: ROUTES.ONBOARDING_SUCCESS,
    element: <Success />,
  },
];
