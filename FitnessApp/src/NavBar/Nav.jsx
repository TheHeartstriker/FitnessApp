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
        <div className="SideBar">{/* The initial indicator */}</div>
        {/* Items */}
        <ul className={`NavBar ${isCollapsed ? "collapsed" : ""}`}>
          <li onClick={handleIconClick}>
            <Bars4Icon className="icons" />
          </li>
          <li onClick={() => navigate("/Share")}>
            {!isCollapsed && <span>Share</span>}
            <ShareIcon className="icons" />
          </li>
          <li onClick={() => navigate("/login")}>
            {!isCollapsed && <span>Login</span>}
            <ArrowLeftEndOnRectangleIcon className="icons" />
          </li>
          <li onClick={() => navigate("/view")}>
            {!isCollapsed && <span>Stats</span>}
            <AdjustmentsHorizontalIcon className="icons" />
          </li>
          <li onClick={() => navigate("/daily")}>
            {!isCollapsed && <span>Daily</span>}
            <HeartIcon className="icons" />
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
