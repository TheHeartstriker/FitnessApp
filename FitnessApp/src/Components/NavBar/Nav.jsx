import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/icons/logo.jsx";
import "./Nav.css";
import CubeIcon from "../../assets/icons/cube.jsx";
import HeartIcon from "../../assets/icons/heart.jsx";
import PeopleIcon from "../../assets/icons/people.jsx";

function getRemInPx() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getIndicatorPositions() {
  const remPx = getRemInPx() * 1.5; // 2rem in px
  return {
    "/view": `${0}px`,
    "/daily": `${35 + remPx}px`,
    "/share": `${70 + remPx * 2}px`,
  };
}

function Nav() {
  //Position the bar indicator needs to move to reach different buttons

  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/") return null;
  const [indicatorPositions, setIndicatorPositions] = useState(
    getIndicatorPositions()
  );
  const [indicatorTop, setIndicatorTop] = useState(
    indicatorPositions[location.pathname] || "0px"
  );

  useEffect(() => {
    function handleResize() {
      const newPositions = getIndicatorPositions();
      setIndicatorPositions(newPositions);
      setIndicatorTop(
        newPositions[location.pathname] || `${0 + getRemInPx() * 2}px`
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  useEffect(() => {
    setIndicatorTop(indicatorPositions[location.pathname] || "0px");
  }, [location.pathname]);

  return (
    <nav className="nav-bar">
      <div className="nav-logo-container">
        <div className="nav-logo">
          <Logo />
        </div>
        <h1>FGraphs</h1>
      </div>
      {/* Route buttons */}
      {/* Button 1 */}
      <button
        className={`nav-bar-button ${
          location.pathname === "/view" ? "active" : ""
        }`}
        id="test-active"
        onClick={() => navigate("/view")}
      >
        <div className="on-bar-indicator" style={{ top: indicatorTop }}></div>
        <CubeIcon />
        <h2>Dashboard</h2>
      </button>
      {/* Button 2 */}
      <button
        className={`nav-bar-button ${
          location.pathname === "/daily" ? "active" : ""
        }`}
        onClick={() => navigate("/daily")}
      >
        <HeartIcon />
        <h2>Daily</h2>
      </button>
      {/* Button 3 */}
      <button
        className={`nav-bar-button ${
          location.pathname === "/share" ? "activeShare" : ""
        }`}
        id="share-button"
        onClick={() => navigate("/share")}
      >
        <PeopleIcon />
        <h2>Share</h2>
      </button>
    </nav>
  );
}

export default Nav;
