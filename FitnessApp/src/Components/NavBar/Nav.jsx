import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/icons/logo.jsx";
import "./Nav.css";
import CubeIcon from "../../assets/icons/cube.jsx";
import HeartIcon from "../../assets/icons/heart.jsx";
import PeopleIcon from "../../assets/icons/people.jsx";
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="nav-bar">
      <div className="nav-logo-container">
        <div className="nav-logo">
          <Logo />
        </div>
        <h1>FGraphs</h1>
      </div>
      <button className="nav-bar-button" id="test-active">
        <div className="on-bar-indicator"></div>
        <CubeIcon />
        <h2>Dashboard</h2>
      </button>
      <button className="nav-bar-button">
        <HeartIcon />
        <h2>Daily</h2>
      </button>
      <button className="nav-bar-button" id="share-button">
        <PeopleIcon />
        <h2>Share</h2>
      </button>
    </nav>
  );
}

export default Nav;
