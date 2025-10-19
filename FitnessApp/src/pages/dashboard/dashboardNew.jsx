import "./dashboardNew.css";
import "./barChart.css";
import BarChart from "./barChart";
import LineChart from "./lineChart.jsx";
import { fetchData } from "../../services/apiFitness.jsx";
import { useEffect, useState } from "react";

function NewDashboard() {
  const [data, setData] = useState([]);
  const [Time, setTime] = useState(0);
  const [Error, setError] = useState(null);
  const currentPeriods = ["currentWeek", "currentMonth", "currentYear"]; // Index into aggregate
  const barChartLabels = ["Weekly", "Monthly", "Yearly"]; //Bar and line chart display

  function cycleTime(time) {
    if (time >= 2) {
      setTime(0);
    } else {
      setTime(time + 1);
    }
  }

  function handleLineTime(time) {
    if (time == 1) {
      return 30;
    } else if (time == 2) {
      return 365;
    }
    return 7;
  }

  //The current periods for inside aggregate

  useEffect(() => {
    async function fetchAwait() {
      try {
        const fetchedData = await fetchData("year", true);
        setData(fetchedData);
        console.log("Fetched data:", data);

        setError(null);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      }
    }
    fetchAwait();
  }, []);

  useEffect(() => {
    console.log("Time state updated:", Time);
  }, [Time]);

  //We need to recived data like so:
  //all data pages
  //Agregated total for week, month, year plus previous period for comparison

  return (
    <div className="dashboard">
      <section className="dashboard-top">
        <div className="dashboard-top-chart">
          <button
            className="dashboard-time-btn"
            onClick={() => cycleTime(Time)}
          >
            <h4>Average {barChartLabels[Time]}</h4>
          </button>
          <div className="dashboard-top-bar-chart">
            <BarChart graphData={data?.aggregate?.[currentPeriods[Time]]} />
          </div>
          <div className="dashboard-bar-legend">
            <h5>Zone one</h5>
            <h5>Zone two</h5>
            <h5>Zone three</h5>
            <h5>Zone four</h5>
            <h5>Zone five</h5>
          </div>
        </div>
        {/* Calories card */}
        <div className="dashboard-card larger">
          <h2>Calories burned</h2>
          <h3>
            {data.aggregate?.[currentPeriods[Time]]?.avgCalories} <br />
            Cal
          </h3>
          <p>
            Your total calories burned the last 7 days you are up{" "}
            <span>14%</span> from the preceding week!
          </p>
        </div>
        {/* Weight card */}
        <div className="dashboard-card">
          <h2>Weight</h2>
          <h3>
            {data.aggregate?.[currentPeriods[Time]]?.avgWeight} <br /> lb's
          </h3>
          <p>
            Your average weight the last 7 day’s you are down <span>1.2%</span>{" "}
            from the preceding week!
          </p>
        </div>
      </section>
      <section className="dashboard-bottom">
        <div className="dashboard-bottom-chart">
          <button
            className="dashboard-time-btn"
            onClick={() => cycleTime(Time)}
          >
            <h4>{barChartLabels[Time]} total</h4>
          </button>
          <LineChart
            dataprop={data?.allFitData}
            TimeProp={handleLineTime(Time)}
          />
        </div>
        <div className="dashboard-card">
          <h2>Average Heart Rate</h2>
          <h3>{data.aggregate?.[currentPeriods[Time]]?.avgRestingHeart} bpm</h3>
          <p>
            Your average resting heart rate the last 7 days you are up{" "}
            <span>5%</span> from the preceding week
          </p>
        </div>
      </section>
    </div>
  );
}

export default NewDashboard;
