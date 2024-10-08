import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../Provider";

function ViewPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  ///Used to hold the data from the API
  const [data, setData] = useState([]);
  //Used to hold the data for the graph
  const [Time, setTime] = useState("week");
  const [Calories, setCalories] = useState(0);
  const [Weight, setWeight] = useState(0);
  const [Heart, setHeart] = useState(0);
  const [Percentagedata, setPercentagedata] = useState(0);
  const [Zone, setZone] = useState({
    Zone1: 0,
    Zone2: 0,
    Zone3: 0,
    Zone4: 0,
    Zone5: 0,
  });
  const pieRef = useRef(null);

  function Percentage(val) {
    if (pieRef.current) {
      pieRef.current.style.setProperty("--ng", val + "deg");
    }
  }
  //Should not go beyond 20 objects
  const [GraphPoints, setGraphPoints] = useState([]);

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

  function getPercentage() {
    let closestData = null;
    let closestDateDiff = Infinity;
    let currentDate = new Date();
    let todayData = null;

    data.forEach((item) => {
      let recordedDate = new Date(item.DateRecorded);
      let dateDiff = Math.abs(currentDate - recordedDate);

      // Check if the date is today
      if (
        recordedDate.getDate() === currentDate.getDate() &&
        recordedDate.getMonth() === currentDate.getMonth() &&
        recordedDate.getFullYear() === currentDate.getFullYear()
      ) {
        todayData = item;
      } else if (dateDiff < closestDateDiff) {
        closestDateDiff = dateDiff;
        closestData = item;
      }
    });

    if (closestData !== null && todayData !== null) {
      let closestDataTime =
        closestData.Zone1Time +
        closestData.Zone2Time +
        closestData.Zone3Time +
        closestData.Zone4Time +
        closestData.Zone5Time;
      let todayDataTime =
        todayData.Zone1Time +
        todayData.Zone2Time +
        todayData.Zone3Time +
        todayData.Zone4Time +
        todayData.Zone5Time;

      if (closestDataTime !== 0) {
        let percentage = (todayDataTime / closestDataTime) * 100;
        setPercentagedata(percentage.toFixed(2));
      } else {
        setPercentagedata("0.00");
      }
    } else {
      setPercentagedata("0.00");
    }
  }
  function SetWeightOrheart(Toaverage, ToSet) {
    let TempWeight = 0;
    let NonDay = 0;
    let currentDate = new Date();
    let lastWeekDate = new Date();
    if (Time === "week") {
      lastWeekDate.setDate(currentDate.getDate() - 7);
    } else if (Time === "month") {
      lastWeekDate.setMonth(currentDate.getMonth() - 1);
    } else if (Time === "year") {
      lastWeekDate.setFullYear(currentDate.getFullYear() - 1);
    }
    const objectsLastWeek = data.filter((item) => {
      let recordedDate = new Date(item.DateRecorded);
      return recordedDate >= lastWeekDate && recordedDate <= currentDate;
    });
    console.log(objectsLastWeek, "objectsLastWeek");
    for (let i = 0; i < objectsLastWeek.length; i++) {
      if (parseFloat(objectsLastWeek[i][Toaverage]) == 0) {
        NonDay += 1;
        continue;
      }
      TempWeight += parseFloat(objectsLastWeek[i][Toaverage]);
    }

    const validDays = objectsLastWeek.length - NonDay;
    ToSet(parseFloat(TempWeight / validDays).toFixed(2));
  }

  // Gets zone data based on a given time range / frame
  function getDataByRange(timeRange) {
    let Datey = new Date();
    let startDate = new Date();

    // Calculate the start date based on the time range
    if (timeRange === "week") {
      startDate.setDate(Datey.getDate() - 7);
    } else if (timeRange === "month") {
      startDate.setMonth(Datey.getMonth() - 1);
    } else if (timeRange === "year") {
      startDate.setFullYear(Datey.getFullYear() - 1);
    } else {
      console.error("Invalid time range specified");
      return;
    }

    let newZone = {
      Zone1: 0,
      Zone2: 0,
      Zone3: 0,
      Zone4: 0,
      Zone5: 0,
    };

    let TempCal = 0;

    for (let i = 0; i < data.length; i++) {
      let recordedDate = new Date(data[i].DateRecorded);
      if (recordedDate >= startDate && recordedDate <= Datey) {
        newZone.Zone1 += data[i].Zone1Time;
        newZone.Zone2 += data[i].Zone2Time;
        newZone.Zone3 += data[i].Zone3Time;
        newZone.Zone4 += data[i].Zone4Time;
        newZone.Zone5 += data[i].Zone5Time;
      }
    }

    TempCal +=
      newZone.Zone1 * 4.5 +
      newZone.Zone2 * 7.5 +
      newZone.Zone3 * 11 +
      newZone.Zone4 * 14.5 +
      newZone.Zone5 * 16.5;
    setCalories(TempCal);
    setZone(newZone);
    ImposeData(newZone);
  }

  //Sets the data for the graph
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
      light -= 10; // Subtract 10% after each iteration
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
    if (isSignedIn) {
      console.log(data, "data");
      getDataByRange(Time);
      SetWeightOrheart("weight", setWeight);
      SetWeightOrheart("resting_heart", setHeart);
      getPercentage();
    }
  }, [Time]);

  useEffect(() => {
    ImposeData(Zone);
  }, [Zone]);

  useEffect(() => {
    Percentage(Percentagedata * 3.6);
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
          <button onClick={() => setTime("week")}>Week</button>
          <button onClick={() => setTime("month")}>Month</button>
          <button onClick={() => setTime("year")}>Year</button>
        </div>
      </div>

      <div className="PercentageContainer">
        <div className="chart">
          <div id="pie" ref={pieRef}></div>
          <h3>
            <span id="percentageVal">
              Today you have done {Percentagedata}% of yesterday
            </span>
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
            Your average weight this {Time} is around {Weight} pounds
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
