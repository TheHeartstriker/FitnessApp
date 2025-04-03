import { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Provider";
import { useNavigate } from "react-router-dom";
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
  //Calls the login or sign up function depending on the state of the login variable
  const handleSignOrLog = () => {
    if (login) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  //Sends the sign up data to be checked by the server and returns a response
  //The response returns a true value if the sign up was successful that is used in creating tasks
  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        return;
      }
      const responseData = await response.json();
      console.log(responseData, "Response data");
      if (responseData.success) {
        setIsSignedIn(true);
        console.log("Login successful");
      } else {
        //If the login fails
        setIsSignedIn(false);
        console.error("Login failed:", responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Sends the data to the server to be inserted into the database
  const handleSignup = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        options
      );

      const responseData = await response.json();
      if (responseData.success) {
        setIsSignedIn(true);
      } else {
        //If the sign up fails
        setIsSignedIn(false);
        alert("Error signing up");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Creates the 'page' of data for the user on this spefic day if the user already has a page it will not create a new one
  //Aka if the user logs in twice in one day it will not create a new page
  async function CreateDataPage() {
    const currentDate = formatDateToMySQL(new Date());
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date: currentDate,
      }),
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/createDataPage`,
        options
      );
      const responseData = await response.json();
      if (responseData.success) {
        console.log("Data page created successfully");
      } else {
        console.error("Error creating data page:", responseData.message);
      }
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
