import { useState, useEffect } from "react";

function BarChart({ graphData, Time }) {
  const [graphPoints, setGraphPoints] = useState([]);

  //Fill the graph points data with the zone data
  function ImposeData(zonedata) {
    let diviedFactor = 0;
    let light = 60; // Start with 60% as a number
    if (Time === "week") {
      diviedFactor = 7;
    } else if (Time === "month") {
      diviedFactor = 30;
    } else if (Time === "year") {
      diviedFactor = 365;
    }
    const zoneKeys = Object.keys(zonedata);
    const newGraphPoints = zoneKeys.map((key) => {
      const hslaValue = `hsla(230, 100%, ${light}%, 1)`;
      light -= 10;
      return {
        "--clr": hslaValue,
        "--Shadow--clr": "hsla(230, 100%, 50%, 0.5)",
        "--val": zonedata[key] / diviedFactor,
        labelName: key,
        DisplayVal: zonedata[key],
      };
    });
    setGraphPoints(newGraphPoints);
  }
  //Iterates over the graph points and returns the new graph or bar
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
    ImposeData(graphData);
    console.log("graphData", graphData);
  }, [graphData, Time]);

  return <NewGraph graphPoints={graphPoints} />;
}

export { BarChart };
