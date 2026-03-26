import "./login.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
function Login() {
  return (
    <section className="login-section">
      {/*  */}
      {/* Left side */}
      {/*  */}
      <div className="login-section-left">
        {/*  */}
        {/* Intro text */}
        <InfoLine text="Some info" />
        <h4>
          Get access to a personalized <br /> fitness app made by a <br />{" "}
          enthusiast
        </h4>
        <img src="/landing/grid.png" alt="Login Illustration" />
      </div>
      {/*  */}
      {/* Left side */}
      {/*  */}
      <div className="login-section-right">
        {/*  */}
        {/* Text area */}
        <div className="login-section-right-header">
          <InfoLine text="Forever free" />
          <h2>Create new account</h2>
          <p>{smallLorem}</p>
        </div>
        {/*  */}
        {/* Input area */}
        <div className="login-section-right-body">
          {/* Input fields */}
          <div className="login-section-right-body-input">
            <h4>Username</h4>
            <h3>Enter your username</h3>
          </div>
          <div className="login-section-right-body-input">
            <h4>Password</h4>
            <h3>Enter your password</h3>
          </div>
          {/* Submit area */}
          <div className="login-section-right-body-submit">
            <div className="login-section-right-body-submit-item">
              <h5>Change method</h5>
            </div>
            <div className="login-section-right-body-submit-item">
              <h5>Submit</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
