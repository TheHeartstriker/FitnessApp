import { useState, useEffect, useContext, useRef, useMemo } from "react";
import BarChart from "./BarChart.jsx";
import DayChart from "./DayChart.jsx";
import { Context } from "../Provider";

function ViewPage() {
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  ///Used to hold the data from the API all the data realted to the user not sorted by time
  const [data, setData] = useState([]);
  //Used to hold the time frame in which the data is being displayed and grabbed
  const [Time, setTime] = useState("week");
  //Calories in spefic time frame
  const [Calories, setCalories] = useState(0);
  //Weight in spefic time frame
  const [Weight, setWeight] = useState(0);
  //Average resting heart rate in spefic time frame
  const [Heart, setHeart] = useState(0);
  //Percentage displated in the pie chart like graphic
  const [Percentagedata, setPercentagedata] = useState(0);
  //graph plot to be used
  const [BarChartOnOff, setBarChartOnOff] = useState(true);
  const [DayChartOnOff, setDayChartOnOff] = useState(false);
  //Used in the main graph displays the time spent in each zone in a spefic time frame
  //Ps dont send more than 20 objects to the graph
  const [Zone, setZone] = useState({
    Zone1: 0,
    Zone2: 0,
    Zone3: 0,
    Zone4: 0,
    Zone5: 0,
  });
  //Refrence to the pie chart
  const pieRef = useRef(null);
  const [IsDatafetched, setIsDatafetched] = useState(false);
  //Fetches the data from the API
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getFitData`,
        options
      );
      const data = await response.json();
      setData(data);
      setIsDatafetched(true);
    } catch (error) {
      console.error(error);
    }
  }
  //Allows the pecentage to be displayed in the pie chart
  function Percentage(val) {
    if (pieRef.current) {
      for (let i = 0; i < val + 1; i++) {
        setTimeout(() => {
          pieRef.current.style.setProperty("--ng", i * 3.6 + "deg");
        }, i * 25); // 100ms delay for each iteration
      }
    }
  }
  //Gets the percentage of the current day compared to the last day the user worked out/logged in
  function getPercentage() {
    //Closest data to the current date
    let closestData = null;
    //Current closest date difference
    let closestDateDiff = Infinity;
    //Current date
    let currentDate = new Date();
    //Data for the current day
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
        //If its the closest date then set it to the closest data
      } else if (dateDiff < closestDateDiff) {
        closestDateDiff = dateDiff;
        closestData = item;
      }
    });
    //If we have found valid data then we can calculate the percentage
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
  //Goes through the data and calculates the average weight or heart rate in a spefied time frame
  function SetWeightOrheart(Toaverage, ToSet) {
    let TempWeight = 0;
    //Helper value to keep track of days with no data and to not include them in the average
    let NonDay = 0;
    let currentDate = new Date();
    let Lastdate = new Date();
    //Sets the last date based on the time frame
    if (Time === "week") {
      Lastdate.setDate(currentDate.getDate() - 7);
    } else if (Time === "month") {
      Lastdate.setMonth(currentDate.getMonth() - 1);
    } else if (Time === "year") {
      Lastdate.setFullYear(currentDate.getFullYear() - 1);
    }
    //Gets the valid data within the time frame
    const TimeframeOb = data.filter((item) => {
      let recordedDate = new Date(item.DateRecorded);
      return recordedDate >= Lastdate && recordedDate <= currentDate;
    });
    //Calculates the average weight or heart rate
    for (let i = 0; i < TimeframeOb.length; i++) {
      if (parseFloat(TimeframeOb[i][Toaverage]) == 0) {
        NonDay += 1;
        continue;
      }
      TempWeight += parseFloat(TimeframeOb[i][Toaverage]);
    }
    const validDays = TimeframeOb.length - NonDay;
    ToSet(parseFloat(TempWeight / validDays).toFixed(2));
  }

  // Gets zone data and cals based on a given time range / frame
  const memoizedDataByRange = useMemo(() => {
    function getDataByRange(timeRange) {
      let Current = new Date();
      let startDate = new Date();

      // Calculate the start date based on the time range
      if (timeRange === "week") {
        startDate.setDate(Current.getDate() - 7);
      } else if (timeRange === "month") {
        startDate.setMonth(Current.getMonth() - 1);
      } else if (timeRange === "year") {
        startDate.setFullYear(Current.getFullYear() - 1);
      } else {
        console.error("Invalid time range specified");
        return;
      }
      //Temp variables to hold the new zone and calories
      let newZone = {
        Zone1: 0,
        Zone2: 0,
        Zone3: 0,
        Zone4: 0,
        Zone5: 0,
      };
      let TempCal = 0;
      //Iterates over the data and calculates the new zone
      for (let i = 0; i < data.length; i++) {
        let recordedDate = new Date(data[i].DateRecorded);
        if (recordedDate >= startDate && recordedDate <= Current) {
          newZone.Zone1 += data[i].Zone1Time;
          newZone.Zone2 += data[i].Zone2Time;
          newZone.Zone3 += data[i].Zone3Time;
          newZone.Zone4 += data[i].Zone4Time;
          newZone.Zone5 += data[i].Zone5Time;
        }
      }
      //Calculates the calories based on the new zone
      //These are based on rough estimates for the calories burned in each zone
      TempCal +=
        newZone.Zone1 * 4.5 +
        newZone.Zone2 * 7.5 +
        newZone.Zone3 * 11 +
        newZone.Zone4 * 14.5 +
        newZone.Zone5 * 16.5;
      return { newZone, TempCal };
    }

    return getDataByRange(Time);
  }, [data, Time]);

  //Fetches the data when the page is loaded
  useEffect(() => {
    fetchData();
  }, []);
  //Calculates the percentage when the Percentagedata is updated
  useEffect(() => {
    if (isSignedIn) {
      Percentage(Percentagedata);
    }
  }, [Percentagedata]);
  //When the data is fetched and the user is signed in we can calculate the data that we need to impose
  useEffect(() => {
    if (IsDatafetched && isSignedIn) {
      setZone(memoizedDataByRange.newZone);
      setCalories(memoizedDataByRange.TempCal.toFixed(2));
      SetWeightOrheart("weight", setWeight);
      SetWeightOrheart("resting_heart", setHeart);
      getPercentage();
    }
  }, [IsDatafetched, Time]);

  return (
    <div className="ViewPageContainer">
      <div className="GraphContainer">
        {/* The actual bar chart inside the GraphContainer */}
        {BarChartOnOff && (
          <div className="BarChart">
            <BarChart graphData={Zone} Time={Time} />
          </div>
        )}
        {DayChartOnOff && <DayChart dataprop={data} TimeProp={Time} />}

        {/* Container for the buttons that switch graphs*/}
        <div className="GraphSwitchContainer">
          <button
            onClick={() => {
              setBarChartOnOff(true), setDayChartOnOff(false);
            }}
          >
            Barchart
          </button>
          <button
            onClick={() => {
              setBarChartOnOff(false), setDayChartOnOff(true);
            }}
          >
            Daychart
          </button>
        </div>

        {/* Container for week, month, and year buttons*/}
        <div className="ButtonContainer">
          <button
            className={`${Time === "week" ? "On" : ""}`}
            onClick={() => setTime("week")}
          >
            Week
          </button>
          <button
            className={`${Time === "month" ? "On" : ""}`}
            onClick={() => setTime("month")}
          >
            Month
          </button>
          <button
            className={`${Time === "year" ? "On" : ""}`}
            onClick={() => setTime("year")}
          >
            Year
          </button>
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
          <h1>Calories Burned</h1>
          <h3>
            Calories burrned this {Time} is roughly around {Calories} based on
            averages around your spefic workout zones
          </h3>
        </div>
        <div className="Data">
          <h1>Weight</h1>
          <h3>
            Your average weight this {Time} is around {Weight} pounds
          </h3>
        </div>
        <div className="Data">
          <h1>Heart</h1>
          <h3>Your average heart resting heart rate is {Heart}</h3>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
