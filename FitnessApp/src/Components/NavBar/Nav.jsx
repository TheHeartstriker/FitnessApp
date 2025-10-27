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

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonHeight, setButtonHeight] = useState(
    window.innerWidth <= 1000 ? 60 : 35
  );
  //Position the bar indicator needs to move to reach different buttons
  const [indicatorPositions, setIndicatorPositions] = useState({});
  const [indicatorTop, setIndicatorTop] = useState("0px");

  function getIndicatorPositions(height) {
    const remPx = getRemInPx() * 1.5; // 2rem in px
    return {
      "/view": `${0}px`,
      "/daily": `${height + remPx}px`,
      "/share": `${height * 2 + remPx * 2}px`,
    };
  }

  useEffect(() => {
    function handleResize() {
      const newHeight = window.innerWidth <= 1000 ? 60 : 35;
      setButtonHeight(newHeight);
      const newPositions = getIndicatorPositions(newHeight);
      setIndicatorPositions(newPositions);
      setIndicatorTop(
        newPositions[location.pathname] || `${0 + getRemInPx() * 2}px`
      );
    }

    // Initialize on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  useEffect(() => {
    setIndicatorTop(indicatorPositions[location.pathname] || "0px");
  }, [location.pathname, indicatorPositions]);

  if (location.pathname === "/") return null;

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
