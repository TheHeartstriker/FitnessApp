import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./privateRoutes.jsx";
import PublicRoutes from "./publicRoutes.jsx";
import Daily from "../pages/daily/daily.jsx";
import Share from "../pages/share/share.jsx";
import LandingPage from "../pages/landing/landing.jsx";
//Current work
import ViewPage from "../pages/dashboard/old/dashboard.jsx";
import NewDashboard from "../pages/dashboard/dashboardNew.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/share" element={<Share />} />
      </Route>

      {/* Private Routes */}
      <Route
        path="/daily"
        element={
          <PrivateRoutes>
            <Daily />
          </PrivateRoutes>
        }
      />
      <Route
        path="/view"
        element={
          <PrivateRoutes>
            <NewDashboard />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
