import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../Provider";

function ViewPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const [data, setData] = useState([]);
  const [Time, setTime] = useState("Week");
  const [Calories, setCalories] = useState(0);
  const [Weight, setWeight] = useState(0);
  const [Heart, setHeart] = useState(0);

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/getFitData",
        options
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const pieRef = useRef(null);

  function Percentage(val) {
    if (pieRef.current) {
      pieRef.current.style.setProperty("--ng", val + "deg");
    }
  }
  //Should not go beyond 20 objects
  const [GraphPoints, setGraphPoints] = useState([
    {
      "--clr": "#5eb344",
      "--Shadow--clr": "#fcb72a",
      "--val": "80",
      labelName: "Zone 1",
      DisplayVal: "80%",
    },
  ]);

  function NewGraph({ graphPoints }) {
    return (
      <>
        {graphPoints.map((point, index) => (
          <div
            className="item"
            key={index}
            style={{
              "--clr": point["--clr"],
              "--val": point["--val"],
              "--Shadow--clr": point["--Shadow--clr"],
            }}
          >
            <div className="label">{point.labelName}</div>
            <div className="value">{point.DisplayVal}</div>
          </div>
        ))}
      </>
    );
  }

  useEffect(() => {
    Percentage(100);
    if (isSignedIn) {
      fetchData();
    }
  }, []);

  return (
    <div className="ViewPageContainer">
      <div className="GraphContainer">
        <div className="simple-bar-chart">
          <NewGraph graphPoints={GraphPoints} />
        </div>
        <div className="ButtonContainer">
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </div>
      </div>

      <div className="PercentageContainer">
        <div className="chart">
          <div id="pie" ref={pieRef}></div>
          <h3>
            <span id="percentageVal">0</span>
          </h3>
        </div>
      </div>
      <div className="DataContainer">
        <div className="Data">
          <h3>Calories Burned</h3>
          <h1>
            Calories burrned this {Time} is around {Calories}
          </h1>
        </div>
        <div className="Data">
          <h3>Weight</h3>
          <h1>
            {Weight < 0
              ? `You have lost ${Math.abs(Weight)} pounds`
              : Weight > 0
              ? `You have gained ${Weight} pounds`
              : "No change in weight"}
          </h1>
        </div>
        <div className="Data">
          <h3>Heart</h3>
          <h1>Your average heart resting heart rate is {Heart}</h1>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
