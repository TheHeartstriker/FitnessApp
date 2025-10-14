import "./dashboardNew.css";
import "./barChart.css";
import BarChart from "./barChart";
import DayChart from "./dayChart";
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
        <div className="dashboard-top-card"></div>
        <div className="dashboard-top-card"></div>
      </section>
      <section className="dashboard-bottom">
        <div className="dashboard-bottom-chart">
          <DayChart dataprop={data?.allFitData?.fitData} TimeProp={"year"} />
        </div>
        <div className="dashboard-bottom-card"></div>
      </section>
    </div>
  );
}

export default NewDashboard;
