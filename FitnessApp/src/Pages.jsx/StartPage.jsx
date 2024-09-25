import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function StartPage() {
  return (
    <div className="StartPageContainer">
      <h1>Hello user this is a lightweight modular fitness tracker</h1>
      <button>Workouts</button>

      <div className="NavContainer">
        <Link to="/view">
          <h3 className="NavBtn On">View</h3>
        </Link>

        <Link to="/create">
          <h3 className="NavBtn On">Create</h3>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
