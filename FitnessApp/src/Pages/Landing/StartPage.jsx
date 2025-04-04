import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FrontSvg from "../../Assets/Front";
import Test from "../../Assets/Test.svg";

function StartPage() {
  //Check for firefox
  const [Browser, setBrowser] = useState(false);
  //Holds vector names
  const [VectorArray, setVectorArray] = useState([]);
  //Amount of vectors to be filled
  const Amount = 105; // 109 is max
  const SvgRef = useRef(null);
  const navigate = useNavigate();

  function handleEnterClick() {
    navigate("/Login");
  }
  //Add the glow class to the vector
  function AddClass(id) {
    const vectorElement = SvgRef.current.querySelector(id);
    if (vectorElement) {
      vectorElement.classList.add("VectorAni");
    }
  }
  //Fill the array with the vector names
  function Fillarray() {
    let TempArr = [];
    TempArr.push("#Vector");
    for (let i = 0; i < 108; i++) {
      TempArr.push(`#Vector_${i}`);
    }
    setVectorArray(TempArr);
  }
  //Randomly select vectors to add the glow effect
  function RandomVec() {
    if (VectorArray.length < 50) return;
    for (let i = 0; i < Amount; i++) {
      const Random = Math.floor(Math.random() * VectorArray.length);
      AddClass(VectorArray[Random]);
    }
  }
  //Check if the user is using firefox which has rastering issues
  useEffect(() => {
    const UserBrowser = navigator.userAgent;
    if (UserBrowser.includes("Firefox")) {
      setBrowser(true);
    }
    console.log(Browser);
  }, [Browser]);

  useEffect(() => {
    if (SvgRef.current) {
      console.log(VectorArray.length);
      if (VectorArray.length === 0) {
        Fillarray();
      }
      if (VectorArray.length == 109) {
        RandomVec();
      }
    }
  }, [VectorArray]);

  return (
    <div className="StartPageContainer">
      <button className="EnterBtn" onClick={handleEnterClick}>
        Enter?
        <div className="CubeBack"></div>
      </button>
      {/* Check for firefox rastor issues */}
      {Browser && (
        <div className="FrontSvg">
          <img src={Test} alt="Test" />
        </div>
      )}
      {/* Normal svg background */}
      {!Browser && <FrontSvg ref={SvgRef} />}
    </div>
  );
}

export default StartPage;
