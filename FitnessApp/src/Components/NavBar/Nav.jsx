import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/icons/logo.jsx";
import "./Nav.css";
import CubeIcon from "../../assets/icons/cube.jsx";
import HeartIcon from "../../assets/icons/heart.jsx";
import PeopleIcon from "../../assets/icons/people.jsx";
function Nav() {
  //Position the bar indicator needs to move to reach different buttons
  let indicatorPositions = {
    "/view": "0px",
    "/daily": "60px",
    "/share": "120px",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [indicatorTop, setIndicatorTop] = useState(
    indicatorPositions[location.pathname] || "0px"
  );

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
