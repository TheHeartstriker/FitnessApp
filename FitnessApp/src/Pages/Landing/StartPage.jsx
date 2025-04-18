import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FrontSvg from "../../assets/Front.jsx";
import "./startPage.css";

function StartPage() {
  //Holds vector names
  const [vectorArray, setvectorArray] = useState([]);
  //Amount of vectors to be filled
  const amount = 105; // 109 is max
  const svgRef = useRef(null);
  const navigate = useNavigate();
  //On click handler
  function handleEnterClick() {
    navigate("/login");
  }
  //Add the glow class to the vector
  function addClass(id) {
    const vectorElement = svgRef.current.querySelector(id);
    if (vectorElement) {
      vectorElement.classList.add("VectorAni");
    }
  }
  //Fill the array with the vector names
  function fillArray() {
    let tempArr = [];
    tempArr.push("#Vector");
    for (let i = 0; i < 108; i++) {
      tempArr.push(`#Vector_${i}`);
    }
    setvectorArray(tempArr);
  }
  //Randomly select vectors to add the glow effect
  function randomVec() {
    if (vectorArray.length < 50) return;
    for (let i = 0; i < amount; i++) {
      const Random = Math.floor(Math.random() * vectorArray.length);
      addClass(vectorArray[Random]);
    }
  }

  useEffect(() => {
    if (svgRef.current) {
      if (vectorArray.length === 0) {
        fillArray();
      }
      if (vectorArray.length == 109) {
        randomVec();
      }
    }
  }, [vectorArray]);

  return (
    <div className="StartPageContainer">
      <button className="EnterBtn" onClick={handleEnterClick}>
        Enter?
        <div className="CubeBack"></div>
      </button>
      {/* Normal svg background */}
      {<FrontSvg ref={svgRef} />}
    </div>
  );
}

export default StartPage;
