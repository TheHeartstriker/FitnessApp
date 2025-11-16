import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleSignup } from "../../../services/ApiAuth";
import "./login.css";
import BackGround from "../../../assets/backGround";

const MAX_INPUT_LENGTH = 50;

function Login() {
  const navigate = useNavigate();
  // Use refs for username and password
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  // Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  // Loading and error states
  const [error, setError] = useState(null);

  // Length validation
  function handleChange(event, refType) {
    if (event.target.value.length > MAX_INPUT_LENGTH) {
      alert("Username or password cannot be longer than 50 characters");
      return;
    }
    if (event.target.value.includes(" ")) {
      alert("Password cannot contain spaces");
    } else {
      if (refType === "username") {
        usernameRef.current = event.target.value;
      } else if (refType === "password") {
        passwordRef.current = event.target.value;
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
        await handleLogin(usernameRef.current, passwordRef.current);
      } else {
        await handleSignup(usernameRef.current, passwordRef.current);
      }
      // If successful, navigate to dashboard
      navigate("/view");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "An error occurred");
    }
  }

  return (
    <section className="login-section">
      <section className="login-welcome-section">
        <h2>Welcome</h2>
        <div className="welcome-overlay"></div>
        <BackGround />
      </section>
      <div className="login-container">
        <section className="login-form-section">
          <h3>{login ? "Welcome Back!" : "Create Account"}</h3>
          <p>Welcome back please login or create a account :)</p>

          <form className="login-form" onSubmit={handleSignOrLog}>
            <h4>Username</h4>
            <input
              type="text"
              defaultValue=""
              onChange={(event) => handleChange(event, "username")}
              required
            />
            <h4>Password</h4>
            <input
              type="password"
              defaultValue=""
              onChange={(event) => handleChange(event, "password")}
              required
            />
            <h5 onClick={handleSwitch}>
              {!login ? (
                <>
                  Already have an <br /> account<span>?</span> <br />
                </>
              ) : (
                <>
                  Don't have an <br /> account<span>?</span> <br />
                </>
              )}
            </h5>
            <button
              type="submit"
              className={error !== null ? "form-btn-error" : ""}
            >
              <h4>{login ? "Login" : "Sign Up"}</h4>
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}

export default Login;
