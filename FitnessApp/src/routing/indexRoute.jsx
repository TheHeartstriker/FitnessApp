import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoutes from "./privateRoutes.jsx";
import PublicRoutes from "./publicRoutes.jsx";
//Current work
const NewDashboard = lazy(() => import("../view/dashboard/dashboardNew.jsx"));
const NewDaily = lazy(() => import("../view/daily/newDaily.jsx"));
const NewShare = lazy(() => import("../view/share/newShare.jsx"));
const RootPath = lazy(() => import("./rootPath.jsx"));

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<RootPath />} />
        <Route path="/share" element={<NewShare />} />
      </Route>

      {/* Private Routes */}
      <Route
        path="/daily"
        element={
          <PrivateRoutes>
            <NewDaily />
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
