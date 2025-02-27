import { useState, useContext } from "react";
import {
  Bars4Icon,
  ArrowLeftEndOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Context } from "../Provider";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isSignedIn) {
    return (
      <div className={`NavBarContainer ${isCollapsed ? "collapsed" : ""}`}>
        <div className="SideBar">
          {/* The initial indicator */}
          <Bars4Icon className="icons" onClick={handleIconClick} />
        </div>
        {/* Items */}
        <ul className={`NavBar ${isCollapsed ? "collapsed" : ""}`}>
          <li onClick={() => navigate("/Share")}>
            {!isCollapsed && <span>Share</span>}
            <div className="iconContainer">
              <ShareIcon className="icons" />
            </div>
          </li>
          <li onClick={() => navigate("/Login")}>
            {!isCollapsed && <span>Login</span>}
            <div className="iconContainer">
              <ArrowLeftEndOnRectangleIcon className="icons" />
            </div>
          </li>
          <li>
            {!isCollapsed && <span>Stats</span>}
            <div className="iconContainer" onClick={() => navigate("/view")}>
              <AdjustmentsHorizontalIcon className="icons" />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
