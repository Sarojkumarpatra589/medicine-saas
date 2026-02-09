import Landing from "./Landing";
import About from "./About";
import Pricing from "./Pricing";
import { ROUTES } from "../../constants/routes";

const PublicRoutes = [
  { path: ROUTES.HOME, element: <Landing /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.PRICING, element: <Pricing /> },
];

export default PublicRoutes;
