import { useState, useEffect } from "react";
import { handleLogin, handleSignup } from "../../services/ApiAuth";
import "./login.css";

const MAX_INPUT_LENGTH = 50;
const PULSE_TYPES = {
  SUCCESS: "Gpulse",
  ERROR: "Rpulse",
};

function Login() {
  // Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  // Loading and error states
  const [error, setError] = useState(null);

  // Length validation (can be longer than 50 characters)
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

  // Call controllers to handle login and signup
  function handleSwitch() {
    setLogin(!login);
    setError(null);
  }

  async function handleSignOrLog(event) {
    event.preventDefault();
    setError(null);
    try {
      if (login) {
        await handleLogin(username, password);
      } else {
        await handleSignup(username, password);
        setCooldown(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "An error occurred");
    }
  }

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>{login ? "Welcome Back!" : "Create Account"}</h2>

        <form className="login-form" onSubmit={handleSignOrLog}>
          <h3>Username</h3>
          <input
            type="text"
            value={username}
            onChange={(event) => handleChange(event, "username")}
            placeholder="Enter username"
            required
          />
          <h3>Password</h3>
          <input
            type="password"
            value={password}
            onChange={(event) => handleChange(event, "password")}
            placeholder="Enter password"
            required
          />
          <hr />
          <button
            type="submit"
            className={error !== null ? "form-btn-error" : ""}
          >
            {" "}
            {login ? "Login" : "Sign Up"}
          </button>
          <hr />
        </form>

        <h3>{login ? "Need an account?" : "Already have an account?"}</h3>
        <button className="switch-btn" onClick={handleSwitch}>
          {login ? "Sign Up" : "Login"}
        </button>
      </div>
    </section>
  );
}

export default Login;
