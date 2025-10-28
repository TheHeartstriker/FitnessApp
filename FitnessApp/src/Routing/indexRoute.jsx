import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./privateRoutes.jsx";
import PublicRoutes from "./publicRoutes.jsx";
//Current work
import NewDashboard from "../pages/dashboard/dashboardNew.jsx";
import NewDaily from "../pages/daily/newDaily.jsx";
import NewShare from "../pages/share/newShare.jsx";
import RootPath from "./rootPath.jsx";

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
