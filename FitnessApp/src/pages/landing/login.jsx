import { useState, useRef, useContext, useEffect } from "react";
import { handleLogin, handleSignup } from "../../services/ApiAuth";
import "./login.css";

const MAX_INPUT_LENGTH = 50;
const COOLDOWN_TIME = 30000;
const PULSE_TYPES = {
  SUCCESS: "Gpulse",
  ERROR: "Rpulse",
};

function LoginPage() {
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  //loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Pulse for the border of the input fields
  const [pulse, setPulse] = useState(false);
  //cooldown for registering and logging in
  const [cooldown, setCooldown] = useState(false);
  //Length validation (can be longer than 50 characters)
  function handleChange(event, setter) {
    if (event.target.value.length > MAX_INPUT_LENGTH) {
      alert("Username or password cannot be longer than 50 characters");
      return;
    }
    if (event.target.value.includes(" ")) {
      alert("Password cannot contain spaces");
    } else {
      if (setter === "username") {
        setUsername(event.target.value);
      } else if (setter === "password") {
        setPassword(event.target.value);
      }
    }
  }
  //Call controllers to handle login and signup
  function handleSwitch() {
    setLogin(!login);
  }
  async function handleSignOrLog() {
    setError(null);
    try {
      setLoading(true);
      if (login) {
        await handleLogin(username, password);
      } else {
        await handleSignup(username, password);
        setCooldown(true);
      }
      handlePulse(PULSE_TYPES.SUCCESS);
      setLoading(false);
    } catch (error) {
      handlePulse(PULSE_TYPES.ERROR);
      console.error("Error:", error.message);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  }

  function handlePulse(str) {
    setPulse(str);
    setTimeout(() => {
      setPulse("");
    }, 5000);
  }

  useEffect(() => {
    if (cooldown) {
      const timer = setTimeout(() => setCooldown(false), COOLDOWN_TIME);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <>
      {/* Loading and error messages */}
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}

      {/* Entire page container */}

      <div className="LogSignContainer">
        {/* Input area */}
        <div className="LogSignPage">
          <h1>Please enter or create an account</h1>
          {/* username */}
          <div className="UP-Container">
            <h2>Username</h2>
          </div>
          <div
            className={`input-group ${
              pulse === PULSE_TYPES.SUCCESS
                ? PULSE_TYPES.SUCCESS
                : pulse === PULSE_TYPES.ERROR
                ? PULSE_TYPES.ERROR
                : ""
            }`}
          >
            <input
              type="text"
              value={username}
              onChange={(event) => handleChange(event, "username")}
            />
          </div>
          {/* password */}
          <div className="UP-Container">
            <h2>Password</h2>
          </div>
          <div
            className={`input-group ${
              pulse === PULSE_TYPES.SUCCESS
                ? PULSE_TYPES.SUCCESS
                : pulse === PULSE_TYPES.ERROR
                ? PULSE_TYPES.ERROR
                : ""
            }`}
          >
            <input
              type="password"
              value={password}
              onChange={(event) => handleChange(event, "password")}
            />
          </div>
          {/* Switcher */}
          <div className="Button-Container-Login">
            <button
              className="loginOrSign"
              onClick={handleSignOrLog}
              disabled={cooldown}
            >
              {login ? "Login" : "Signup"}
            </button>
            <button className="Switch" onClick={handleSwitch}>
              {login ? "Switch to Signup" : "Switch to Login"}
            </button>
          </div>
        </div>
        {/* Explaination area */}
        <div className="WhatIsThis">
          <div className="WhatIsThis-H1Main">
            <h1>Welcome to FGraphs</h1>
          </div>
          <div className="WhatIsThis-H2">
            <p>
              What is FGraphs? Why does it exist? Well its a playground for both
              code and gains. Built to flex and train my programming skills.
              Built to be practical to the point. Hope you enjoy it! Have a good
              Day😊
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
