import { useState, useRef } from "react";

function LoginPage() {
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  //Used in junction with the animation to stop the user from clicking multiple times
  const [CanClick, setCanClick] = useState(true);

  const borderRef = useRef(null);
  //Indicates faliure
  function AnimateBorderRed() {
    const border = borderRef.current;
    border.classList.add("AnimatePulseRed");
    setCanClick(false);
    setTimeout(() => {
      border.classList.remove("AnimatePulseRed");
      setCanClick(true);
    }, 1500);
  }
  //Indicates success
  function AnimateBorderGreen() {
    const border = borderRef.current;
    border.classList.add("AnimatePulseGreen");
    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
      border.classList.remove("AnimatePulseGreen");
    }, 1500);
  }

  //Handling the event changes
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

  return (
    <>
      {/* Outside container */}
      <div className="LogSignContainer">
        {/* The inside container that holds the text boxes */}
        <div className="LogSignPage">
          <div className="input-group">
            <input
              ref={borderRef}
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button className="loginOrSign">{login ? "Login" : "Signup"}</button>
          <button className="Switch" onClick={handleSwitch}>
            {login ? "Switch to Signup" : "Switch to Login"}
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
