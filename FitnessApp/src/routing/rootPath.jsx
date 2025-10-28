import LandingPage from "../pages/landing/landing.jsx";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../services/apiGuards";

function RootPath() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    async function validateUser() {
      const isAuth = await checkAuthentication();
      setIsAuthenticated(isAuth);

      // Check if this is the initial load
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (isAuth && !hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
        setShouldRedirect(true);
      }
    }
    validateUser();
  }, []);
  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // If authenticated and initial load, redirect to /view
  if (shouldRedirect) {
    return <Navigate to="/view" replace />;
  }

  // Otherwise show landing page
  return <LandingPage />;
}

export default RootPath;
