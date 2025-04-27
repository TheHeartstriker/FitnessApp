import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./privateRoutes.jsx";
import PublicRoutes from "./publicRoutes.jsx";
import StartPage from "../pages/landing/startPage.jsx";
import LoginPage from "../pages/login/login.jsx";
import Daily from "../pages/daily/daily.jsx";
import Share from "../pages/share/share.jsx";
import ViewPage from "../pages/dataView/viewPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
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
            <ViewPage />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
