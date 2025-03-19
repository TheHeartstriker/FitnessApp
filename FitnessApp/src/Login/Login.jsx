import { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Provider";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../Background.jsx";

function LoginPage() {
  //Important context values used across the app
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  //Used in junction with the animation to stop the user from clicking multiple times
  const [CanClick, setCanClick] = useState(true);
  //Refrence to the border
  const borderRef = useRef(null);
  const navigate = useNavigate();
  //Adds a red border to the input fields to indicate failure
  function AnimateBorderRed() {
    const border = borderRef.current;
    border.classList.add("AnimatePulseRed");
    setCanClick(false);
    setTimeout(() => {
      border.classList.remove("AnimatePulseRed");
      setCanClick(true);
    }, 1500);
  }
  //Adds a green border to the input fields to indicate success
  function AnimateBorderGreen() {
    const border = borderRef.current;
    border.classList.add("AnimatePulseGreen");
    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
      border.classList.remove("AnimatePulseGreen");
    }, 1500);
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
  //Calls the login or sign up function depending on the state of the login variable
  const handleSignOrLog = () => {
    if (!CanClick) {
      return;
    }
    if (login) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  function formatDateToMySQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //Sends the sign up data to be checked by the server and returns a response
  //The response returns a true value if the sign up was successful that is used in creating tasks
  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
        date: formatDateToMySQL(new Date()),
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        options
      );
      const responseData = await response.json();
      if (responseData.success) {
        AnimateBorderGreen();
        setIsSignedIn(true);
      } else {
        //If the login fails
        AnimateBorderRed();
        setIsSignedIn(false);
        alert("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Sends the data to the server to be inserted into the database
  const handleSignup = async () => {
    if ((await CheckIfInUse(username)) === true) {
      alert("Username is already in use");
      AnimateBorderRed();
      return;
    }
    let UserId = uuidv4();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
        UserId,
        date: formatDateToMySQL(new Date()),
      }),
    };
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, options);
      setIsSignedIn(true);
      AnimateBorderGreen();
    } catch (error) {
      AnimateBorderRed();
      console.error("Error:", error);
    }
  };
  //Checks if the username is in use by sending the username to the server and returning a response
  async function CheckIfInUse() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/checkUsername`,
        options
      );
      const responseData = await response.json();
      console.log("Name in use", responseData);
      if (responseData) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //Creates the 'page' of data for the user on this spefic day if the user already has a page it will not create a new one
  //Aka if the user logs in twice in one day it will not create a new page
  async function CreateDataPage() {
    const currentDate = new Date().toLocaleDateString("en-CA");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Zone1: 0,
        Zone2: 0,
        Zone3: 0,
        Zone4: 0,
        Zone5: 0,
        weight: 0,
        HeartRate: 0,
        Date: currentDate,
      }),
      credentials: "include",
    };
    try {
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/createDataPage`,
        options
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      CreateDataPage();
    }
  }, [isSignedIn]);

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
              ref={borderRef}
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
