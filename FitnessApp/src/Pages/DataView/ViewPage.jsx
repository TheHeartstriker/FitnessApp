import { useState, useEffect, useRef } from "react";
import BarChart from "./barChart.jsx";
import DayChart from "./dayChart.jsx";
import "./viewPage.css";
import { fetchData } from "../../services/apiFitness.jsx";

function ViewPage() {
  ///Used to hold the data from the API all the data realted to the user not sorted by time
  const [data, setData] = useState([]);
  const [Time, setTime] = useState("week");
  //Html values
  const [Calories, setCalories] = useState(0);
  const [Weight, setWeight] = useState(0);
  const [Heart, setHeart] = useState(0);
  //Percentage displayed in the pie chart like graphic
  const [Percentagedata, setPercentagedata] = useState(0);
  //graph plot to be used
  const [BarChartOnOff, setBarChartOnOff] = useState(true);
  const pieRef = useRef(null);
  const percentageRef = useRef(null);
  //Here but not implemented yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function Percentage(val) {
    if (!pieRef.current) return;
    //clear timeouts and reset pie
    if (percentageRef.current) {
      percentageRef.current.forEach((timeout) => clearTimeout(timeout));
    }
    percentageRef.current = [];
    pieRef.current.style.setProperty("--ng", 0 + "deg");
    // animation
    for (let i = 0; i <= val; i++) {
      const timeout = setTimeout(() => {
        pieRef.current.style.setProperty("--ng", i * 3.6 + "deg");
      }, i * 25);
      percentageRef.current.push(timeout);
    }
  }
  //Fetches the data when the page is loaded
  useEffect(() => {
    async function fetchAwait() {
      try {
        const fetchedData = await fetchData(`${Time}`, true);
        setData(fetchedData);
        console.log("Fetched data:", data);

        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchAwait();
  }, [Time]);
  //Initializes all the data that we need to display in the page
  useEffect(() => {
    if (!data || !data.formattedData) return;
    let formattedData = data?.formattedData;
    setPercentagedata(data?.allFitData?.percentage);
    Percentage(data?.allFitData?.percentage);
    setCalories(formattedData[0]?.caloriesBurned);
    setWeight(formattedData[0]?.avgWeight);
    setHeart(formattedData[0]?.avgRestingHeart);
  }, [data]);

  //When the data is fetched and the user is signed in we can calculate the data that we need to impose

  return (
    <div className="ViewPageContainer">
      <div className="dataDisplayContainer">
        <div className="GraphContainer">
          {/* The actual bar chart inside the GraphContainer */}
          {BarChartOnOff && (
            <div className="BarChart">
              <BarChart graphData={data?.formattedData} Time={Time} />
            </div>
          )}
          {!BarChartOnOff && (
            <DayChart dataprop={data?.allFitData?.fitData} TimeProp={Time} />
          )}

          {/* Container for the buttons that switch graphs*/}
          <div className="GraphSwitchContainer">
            <button
              onClick={() => {
                setBarChartOnOff(true);
              }}
            >
              Barchart
            </button>
            <button
              onClick={() => {
                setBarChartOnOff(false);
              }}
            >
              Daychart
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
      </div>
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
