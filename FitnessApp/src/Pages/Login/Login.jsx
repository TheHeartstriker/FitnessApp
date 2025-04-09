import { useState, useRef, useContext, useEffect } from "react";
import { handleLogin, handleSignup } from "../../Services/ApiAuth";
import "./Login.css";
function LoginPage() {
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);

  //Handling the event changes for the username
  const handleUsernameChange = (event) => {
    if (event.target.value.length > 49) {
      alert("Username is too long");
      return;
    }
    if (event.target.value.includes(" ")) {
      alert("Username cannot contain spaces");
    } else {
      setUsername(event.target.value);
    }
  };
  //Handling the event changes for the password
  const handlePasswordChange = (event) => {
    if (event.target.value.length > 49) {
      alert("Password is too long");
      return;
    }
    if (event.target.value.includes(" ")) {
      alert("Password cannot contain spaces");
    } else {
      setPassword(event.target.value);
    }
  };

  function handleSwitch() {
    setLogin(!login);
  }

  function handleSignOrLog() {
    if (login) {
      handleLogin(username, password);
    } else {
      handleSignup(username, password);
    }
  }

  return (
    <>
      {/* Outside container */}
      <div className="LogSignContainer">
        {/* The inside container that holds the text boxes */}
        <div className="LogSignPage">
          <h1>Please enter or create an account</h1>
          <div className="UP-Container">
            <h2>Username</h2>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="UP-Container">
            <h2>Password</h2>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="Button-Container-Login">
            <button className="loginOrSign" onClick={handleSignOrLog}>
              {login ? "Login" : "Signup"}
            </button>
            <button className="Switch" onClick={handleSwitch}>
              {login ? "Switch to Signup" : "Switch to Login"}
            </button>
          </div>
        </div>
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
