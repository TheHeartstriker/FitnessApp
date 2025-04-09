import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuthentication } from "../Services/apiGuards";

function PrivateRoutes({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  //Call service to check authentication status
  useEffect(() => {
    async function validateUser() {
      const isAuth = await checkAuthentication();
      setIsAuthenticated(isAuth);
    }
    validateUser();
  }, [location.pathname]);
  // Loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
