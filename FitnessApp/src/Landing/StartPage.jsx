import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../Provider";
import FrontSvg from "../Images/Front";
import Test from "../Images/Test.svg";

function StartPage() {
  //Checl for firefox
  const [Browser, setBrowser] = useState(false);
  const [VectorArray, setVectorArray] = useState([]);
  const Amount = 15;
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const SvgRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMoveDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  function AddClass(id) {
    const vectorElement = SvgRef.current.querySelector(id);
    if (vectorElement) {
      //Add the glow effect
      vectorElement.classList.add("VectorAni");
      const fillColor = window.getComputedStyle(vectorElement).fill;
      const fillColorArray = fillColor
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);
      let NewColor1 = [
        255 - fillColorArray[0],
        255 - fillColorArray[1],
        255 - fillColorArray[2],
      ];
      let NewColor2 = [
        255 - fillColorArray[0] * 0.9,
        255 - fillColorArray[1] * 0.9,
        255 - fillColorArray[2],
      ];
      vectorElement.style.setProperty(
        "--VectorColor1",
        `rgb(${NewColor1[0]}, ${NewColor1[1]}, ${NewColor1[2]})`
      );
      vectorElement.style.setProperty(
        "--VectorColor2",
        `rgb(${NewColor2[0]}, ${NewColor2[1]}, ${NewColor2[2]})`
      );
    }
  }

  function Fillarray() {
    let TempArr = [];
    TempArr.push("#Vector");
    for (let i = 0; i < 108; i++) {
      TempArr.push(`#Vector_${i}`);
    }
    setVectorArray(TempArr);
    console.log(VectorArray);
  }

  function RandomVec() {
    if (VectorArray.length < 50) return;
    for (let i = 0; i < Amount; i++) {
      const Random = Math.floor(Math.random() * VectorArray.length);
      AddClass(VectorArray[Random]);
    }
  }

  useEffect(() => {
    const UserBrowser = navigator.userAgent;
    if (UserBrowser.includes("Firefox")) {
      setBrowser(true);
    }
    console.log(Browser);
  }, [Browser]);

  useEffect(() => {
    if (
      isSignedIn === false &&
      location.pathname !== "/login" &&
      location.pathname !== "/share"
    ) {
      navigate("/login");
    }
  }, [isSignedIn, navigate, location]);

  useEffect(() => {
    if (SvgRef.current) {
      Fillarray();
      RandomVec();
    }
  }, []);

  return (
    <div className="StartPageContainer">
      <button className="MoveDown" onClick={handleMoveDown}></button>
      {/* Check for firefox has major rastoring error for a direct svg like this one */}
      {Browser && (
        <div className="FrontSvg">
          <img src={Test} alt="Test" />
        </div>
      )}
      {/* Normal svg background */}
      {!Browser && <FrontSvg ref={SvgRef} />}

      <div className="NavContainer">
        {/* Non conditional links */}
        <Link to="/share">
          <h3 className="NavBtn">Share</h3>
        </Link>
        <Link to="/login">
          <h3 className="NavBtn">Login</h3>
        </Link>

        {/* If they are not logged in they dont need to see these values */}
        {isSignedIn && (
          <>
            <Link to="/">
              <h3 className="NavBtn">View</h3>
            </Link>
            <Link to="/daily">
              <h3 className="NavBtn">Daily</h3>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default StartPage;
