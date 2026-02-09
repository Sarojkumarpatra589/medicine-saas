import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      {/* <h1>Medicine SaaS Application</h1> */}
      <Outlet />
    </div>
  );
}
