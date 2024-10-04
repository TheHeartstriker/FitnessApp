import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../Provider";

function ViewPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const [data, setData] = useState([]);

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

  const [GraphPoints, setGraphPoints] = useState([
    { start: 0, end: 0.5, value: 20, color: "red" },
    { start: 0.5, end: 0.2, value: 20, color: "red" },
    { start: 0.2, end: 0.4, value: 40, color: "red" },
  ]);

  const [GraphPoints2, setGraphPoints2] = useState([
    { start: 0, end: 0.2, value: 20, color: "green" },
    { start: 0.2, end: 0.5, value: 20, color: "green" },
    { start: 0.5, end: 0.3, value: 40, color: "green" },
  ]);

  function NewGraph({ graphPoints }) {
    return (
      <>
        {graphPoints.map((point, index) => (
          <tr key={index}>
            <td
              style={{
                "--start": point.start,
                "--end": point.end,
                "--color": point.color,
              }}
            >
              {point.value}
            </td>
          </tr>
        ))}
      </>
    );
  }

  useEffect(() => {
    Percentage(290);
    if (isSignedIn) {
      fetchData();
    }
  }, []);

  return (
    <div className="ViewPageContainer">
      <div className="GraphContainer">
        <table className="area-chart">
          <tbody>
            <NewGraph graphPoints={GraphPoints} />
            <NewGraph graphPoints={GraphPoints2} />
          </tbody>
        </table>
      </div>

      <div className="PercentageContainer">
        <div className="chart">
          <div id="pie" ref={pieRef}></div>
          <h3>
            <span id="percentageVal">0</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
