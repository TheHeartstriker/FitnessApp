import "./dashboardNew.css";
import "./barChart.css";
import BarChart from "./barChart";
import LineChart from "./lineChart.jsx";
import { fetchData } from "../../services/apiFitness.jsx";
import { useEffect, useState } from "react";

function NewDashboard() {
  const [data, setData] = useState([]);
  const [Time, setTime] = useState("year");
  const [Error, setError] = useState(null);

  useEffect(() => {
    async function fetchAwait() {
      try {
        const fetchedData = await fetchData(`${Time}`, true);
        setData(fetchedData);
        console.log("Fetched data:", data);

        setError(null);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      }
    }
    fetchAwait();
  }, [Time]);

  return (
    <div className="dashboard">
      <section className="dashboard-top">
        <div className="dashboard-top-chart">
          <button className="dashboard-time-btn">
            <h4>Weekly</h4>
          </button>
          <div className="dashboard-top-bar-chart">
            <BarChart graphData={data?.formattedData} />
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
            {data.formattedData?.[0]?.caloriesBurned} <br />
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
            {data.formattedData?.[0]?.avgWeight} <br /> lb's
          </h3>
          <p>
            Your average weight the last 7 day’s you are down <span>1.2%</span>{" "}
            from the preceding week!
          </p>
        </div>
      </section>
      <section className="dashboard-bottom">
        <div className="dashboard-bottom-chart">
          <LineChart dataprop={data?.allFitData?.fitData} TimeProp={"year"} />
        </div>
        <div className="dashboard-card">
          <h2>Average Heart Rate</h2>
          <h3>{data.formattedData?.[0]?.avgRestingHeart} bpm</h3>
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
