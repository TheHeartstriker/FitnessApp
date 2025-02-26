import { useState } from "react";
import {
  Bars4Icon,
  ArrowLeftEndOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleIconClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`NavBarContainer ${isCollapsed ? "collapsed" : ""}`}>
      <div className="SideBar">
        {/* The initial indicator */}
        <Bars4Icon className="icons" onClick={handleIconClick} />
      </div>
      {/* Items */}
      <ul className={`NavBar ${isCollapsed ? "collapsed" : ""}`}>
        <li>
          {!isCollapsed && <span>Share</span>}
          <div className="iconContainer">
            <ShareIcon className="icons" />
          </div>
        </li>
        <li>
          {!isCollapsed && <span>Login</span>}
          <div className="iconContainer">
            <ArrowLeftEndOnRectangleIcon className="icons" />
          </div>
        </li>
        <li>
          {!isCollapsed && <span>Stats</span>}
          <div className="iconContainer">
            <AdjustmentsHorizontalIcon className="icons" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
