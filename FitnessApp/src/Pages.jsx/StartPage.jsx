import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Provider";

function StartPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const navigate = useNavigate();

  const handleMoveDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll down by one viewport height
      behavior: "smooth", // Smooth scrolling
    });
  };

  useEffect(() => {
    if (isSignedIn === false) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="StartPageContainer">
      <div className="Textscreen">
        <h1>
          This is FGraph a simple lightweight fitness tracker meant to give you
          an
          <br />
          overhead view of your progress
        </h1>
      </div>
      <button className="MoveDown" onClick={handleMoveDown}></button>

      <div className="NavContainer">
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
