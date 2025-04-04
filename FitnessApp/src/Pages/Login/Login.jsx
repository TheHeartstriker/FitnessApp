import { useState, useRef, useContext, useEffect } from "react";
import { Context } from "../../Routing/Provider";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleSignup } from "../../Services/ApiAuth";
import { createDataPage } from "../../Services/ApiFitness";
function LoginPage() {
  //Important context values used across the app
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  //Refrence to the border
  const navigate = useNavigate();

  function formatDateToMySQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
  //Switch between login and signup
  const handleSwitch = () => {
    if (login) {
      setLogin(false);
      setSignup(true);
    } else {
      setLogin(true);
      setSignup(false);
    }
  };

  function createPage() {
    const currentDate = formatDateToMySQL(new Date());
    createDataPage(currentDate);
  }
  //Calls the login or sign up function depending on the state of the login variable
  const handleSignOrLog = () => {
    if (login) {
      let val = handleLogin(username, password);
      if (val) {
        createPage();
      }
    } else {
      let val = handleSignup(username, password);
      if (val) {
        createPage();
      }
    }
  };

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
