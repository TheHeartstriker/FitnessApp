import { useState, useContext } from "react";
import {
  Bars4Icon,
  ArrowLeftEndOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Context } from "../Provider";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleIconClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="NavContainer">
      <div className="Ball"></div>
      <div className="NavContent">
        <div className="NavIcon">
          <ArrowLeftEndOnRectangleIcon className="Icon"></ArrowLeftEndOnRectangleIcon>
          <h1>Login</h1>
        </div>
        <div className="NavIcon">
          <HeartIcon className="Icon"></HeartIcon>
          <h1>Login</h1>
        </div>
        <div className="NavIcon">
          <AdjustmentsHorizontalIcon className="Icon"></AdjustmentsHorizontalIcon>
          <h1>Login</h1>
        </div>
        <div className="NavIcon">
          <ShareIcon className="Icon"></ShareIcon>
          <h1>Login</h1>
        </div>
      </div>
      <div className="GithubIcon"></div>
    </div>
  );
}

export default Nav;
