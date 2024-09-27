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
        Workouts
      </button>

      <div className="NavContainer">
        <Link to="/daily">
          <h3 className="NavBtn On">Daily</h3>
        </Link>

        <Link to="/create">
          <h3 className="NavBtn On">Create</h3>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
