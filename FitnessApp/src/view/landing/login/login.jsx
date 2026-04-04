import "./login.css";
import { useEffect, useState, useRef } from "react";
import { smallLorem, largeLorem } from "@/utils/text";
import { useNavigate } from "react-router-dom";
import InfoLine from "@/components/infoLine/infoLine";
import LoginAni from "./loginAni";
import { handleLogin, handleSignup } from "@/services/ApiAuth";
import BackGroundGen from "@/components/backGroundGen";
import BackGround2 from "@/../public/landing/backGround2";
import { para } from "./text";

const MAX_INPUT_LENGTH = 50;

function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginSign, setLoginSign] = useState(false);
  const navigate = useNavigate();
  //
  //Input validation
  //
  function handleInput(event, refType) {
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
  //
  // Type switch
  //
  function handleTypeSwitch() {
    setLoginSign(!loginSign);
  }
  //
  // Handle Sign In or log
  //
  async function handleSignOrLog() {
    try {
      console.log("Username:", usernameRef.current);
      console.log("Password:", passwordRef.current);

      if (loginSign) {
        await handleLogin(usernameRef.current, passwordRef.current);
      } else {
        await handleSignup(usernameRef.current, passwordRef.current);
      }
      navigate("/view");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "An error occurred");
    }
  }

  return (
    <section className="login-section">
      <LoginAni />
      {/*  */}
      {/* Left side */}
      {/*  */}
      <div className="login-section-left">
        {/*  */}
        {/* Intro text */}
        <InfoLine text="Login" reverse={true} />
        <h4>
          Get access to a personalized <br /> fitness app made by a <br />{" "}
          enthusiast
        </h4>
        <BackGroundGen
          svgComponent={<BackGround2 />}
          parent={".login-section-left"}
        />
      </div>
      {/*  */}
      {/* Left side */}
      {/*  */}
      <div className="login-section-right">
        {/*  */}
        {/* Text area */}
        <div className="login-section-right-header">
          <InfoLine text="Forever free" reverse={true} />
          <h2>{loginSign ? "Sign In" : "Create new account"}</h2>
          <p>{para}</p>
        </div>
        {/*  */}
        {/* Input area */}
        <form
          className="login-section-right-body"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignOrLog();
          }}
        >
          {/* Input fields */}
          <div className="login-section-right-body-input">
            <h4>Username</h4>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => handleInput(e, "username")}
            />
          </div>
          <div className="login-section-right-body-input">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => handleInput(e, "password")}
            />
          </div>
          {/* Submit area */}
          <div className="login-section-right-body-submit">
            <button onClick={handleTypeSwitch} type="button">
              <h5>Change method</h5>
            </button>
            <button type="submit">
              <h5>Submit</h5>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
