import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function StartPage() {
  const handleMoveDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll down by one viewport height
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div className="StartPageContainer">
      <h1>The is FGraph a lightweight fitness tracker</h1>
      <button className="MoveDown" onClick={handleMoveDown}>
        Down
      </button>

      <div className="NavContainer">
        <Link to="/">
          <h3 className="NavBtn On">View</h3>
        </Link>

        <Link to="/daily">
          <h3 className="NavBtn On">Daily</h3>
        </Link>

        <Link to="/login">
          <h3 className="NavBtn On">Login</h3>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
