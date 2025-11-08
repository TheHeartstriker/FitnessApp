import "./dashboardNew.css";
import "./barChart.css";
import BarChart from "./barChart";
import LineChart from "./lineChart.jsx";
import { fetchData } from "../../services/apiFitness.jsx";
import { useEffect, useRef, useState } from "react";

function NewDashboard() {
  const [data, setData] = useState([]);
  const [Time, setTime] = useState(0);
  const [Error, setError] = useState(null);
  const percentageRef = useRef({
    week: { calories: 0, weight: 0, heartRate: 0 },
    month: { calories: 0, weight: 0, heartRate: 0 },
    year: { calories: 0, weight: 0, heartRate: 0 },
  });

  const currentPeriods = ["currentWeek", "currentMonth", "currentYear"]; // Index into aggregate
  const barChartLabels = ["Weekly", "Monthly", "Yearly"]; //Bar and line chart display
  const periodLabels = ["week", "month", "year"]; //Percentage comparison labels

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

  function percentageToText(percentage) {
    if (percentage == null || isNaN(percentage)) {
      return <span> neutral </span>;
    }
    if (Number(percentage) > 0) {
      return (
        <>
          up <span>{Math.abs(percentage)}%</span>
        </>
      );
    }
    if (Number(percentage) < 0) {
      return (
        <>
          down <span>{Math.abs(percentage)}%</span>
        </>
      );
    }
    return <span> neutral </span>;
  }

  //The current periods for inside aggregate

  useEffect(() => {
    async function fetchAwait() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        percentageRef.current.week = {
          calories: fetchedData.aggregate.currentWeek.caloriesChange,
          weight: fetchedData.aggregate.currentWeek.weightChange,
          heartRate: fetchedData.aggregate.currentWeek.heartRateChange,
        };
        percentageRef.current.month = {
          calories: fetchedData.aggregate.currentMonth.caloriesChange,
          weight: fetchedData.aggregate.currentMonth.weightChange,
          heartRate: fetchedData.aggregate.currentMonth.heartRateChange,
        };
        percentageRef.current.year = {
          calories: fetchedData.aggregate.currentYear.caloriesChange,
          weight: fetchedData.aggregate.currentYear.weightChange,
          heartRate: fetchedData.aggregate.currentYear.heartRateChange,
        };
        console.log("Fetched data:", fetchedData);
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
          <div className="dashboard-top-btn-container">
            <button
              className="dashboard-time-btn"
              onClick={() => cycleTime(Time)}
            >
              <h4>Average {barChartLabels[Time]}</h4>
            </button>
            <button
              className="dashboard-tooltip"
              data-tooltip="This chart displays your average time spent in each&#10; zone over the last x days."
            >
              <h4>i</h4>
            </button>
          </div>

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
            {data.aggregate?.[currentPeriods[Time]]?.avgCalories ?? 0} <br />
            Cal
          </h3>
          <p>
            Your average calories burned the last {handleLineTime(Time)} days
            you are{" "}
            {percentageToText(
              data.aggregate?.[currentPeriods[Time]]?.caloriesChange ?? 0
            )}{" "}
            from the preceding {periodLabels[Time]}!
          </p>
        </div>
        {/* Weight card */}
        <div className="dashboard-card">
          <h2>Weight</h2>
          <h3>
            {data.aggregate?.[currentPeriods[Time]]?.avgWeight ?? 0} <br /> lb's
          </h3>
          <p>
            Your average weight the last {handleLineTime(Time)} days you are
            {percentageToText(
              data.aggregate?.[currentPeriods[Time]]?.weightChange
            )}
            from the preceding {periodLabels[Time]}!
          </p>
        </div>
      </section>
      <section className="dashboard-bottom">
        <div className="dashboard-bottom-chart">
          <div className="dashboard-bottom-btn-container">
            <button
              className="dashboard-time-btn"
              onClick={() => cycleTime(Time)}
            >
              <h4>{barChartLabels[Time]} total</h4>
            </button>
            <button
              className="dashboard-tooltip"
              data-tooltip="This chart displays your total time spent working out &#10; over the selected time period regardless of the zone."
            >
              <h4>i</h4>
            </button>
          </div>
          <LineChart
            dataprop={data?.allFitData}
            TimeProp={handleLineTime(Time)}
          />
        </div>
        <div className="dashboard-card">
          <h2>Average Heart Rate</h2>
          <h3>{data.aggregate?.[currentPeriods[Time]]?.avgRestingHeart} bpm</h3>
          <p>
            Your average resting heart rate the last {handleLineTime(Time)} days
            you are
            {percentageToText(
              data.aggregate?.[currentPeriods[Time]]?.heartRateChange
            )}{" "}
            from the preceding {periodLabels[Time]}!
          </p>
        </div>
      </section>
    </div>
  );
}

export default NewDashboard;
