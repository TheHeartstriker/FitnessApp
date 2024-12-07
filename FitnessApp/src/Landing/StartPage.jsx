import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../Provider";

function StartPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMoveDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (
      isSignedIn === false &&
      location.pathname !== "/login" &&
      location.pathname !== "/share"
    ) {
      navigate("/login");
    }
  }, [isSignedIn, navigate, location]);

  return (
    <div className="StartPageContainer">
      <button className="MoveDown" onClick={handleMoveDown}></button>

      <div className="NavContainer">
        <Link to="/share">
          <h3 className="NavBtn">Share</h3>
        </Link>

        {/* If they are not logged in they dont need to see these values */}
        {isSignedIn && (
          <>
            <Link to="/">
              <h3 className="NavBtn">View</h3>
            </Link>
            <Link to="/daily">
              <h3 className="NavBtn">Daily</h3>
            </Link>
          </>
        )}

        <Link to="/login">
          <h3 className="NavBtn">Login</h3>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
