import Landing from "./Landing";
import About from "./About";
import Pricing from "./Pricing";
import Features from "./Features";
import Contact from "./Contact";
import { ROUTES } from "../../constants/routes";

const PublicRoutes = [
  { path: ROUTES.HOME, element: <Landing /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.PRICING, element: <Pricing /> },
  { path: ROUTES.FEATURES, element: <Features /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
];

export default PublicRoutes;
