import {
  ArrowLeftEndOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  //Open to the Github page of the project
  function GithubLink() {
    window.open(
      "https://github.com/TheHeartstriker/FitnessApp",
      "_blank",
      "noopener noreferrer"
    );
  }
  if (location.pathname !== "/") {
    return (
      <div className="NavContainer">
        <div className="Ball" onClick={() => navigate("/")}></div>
        <div className="NavContent">
          <div
            className={`NavIcon ${
              location.pathname === "/login" ? "Active" : ""
            }`}
            onClick={() => navigate("/login")}
          >
            <ArrowLeftEndOnRectangleIcon className="Icon"></ArrowLeftEndOnRectangleIcon>
            <h1>Login</h1>
          </div>
          <div
            className={`NavIcon ${
              location.pathname === "/daily" ? "Active" : ""
            }`}
            onClick={() => navigate("/daily")}
          >
            <HeartIcon className="Icon"></HeartIcon>
            <h1>Daily</h1>
          </div>
          <div
            className={`NavIcon ${
              location.pathname === "/view" ? "Active" : ""
            }`}
            onClick={() => navigate("/view")}
          >
            <AdjustmentsHorizontalIcon className="Icon"></AdjustmentsHorizontalIcon>
            <h1>Stats</h1>
          </div>
          <div
            className={`NavIcon ${
              location.pathname === "/share" ? "Active" : ""
            }`}
            onClick={() => navigate("/share")}
          >
            <ShareIcon className="Icon"></ShareIcon>
            <h1>Share</h1>
          </div>
        </div>
        <div className="GithubIcon" onClick={() => GithubLink()}></div>
      </div>
    );
  }
}

export default Nav;
