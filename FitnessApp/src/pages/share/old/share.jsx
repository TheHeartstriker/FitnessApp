import { useEffect, useState } from "react";
import { fetchPublicShare } from "../../../services/apiFitness";
import "./share.css";

function Share() {
  const [fitnessRecords, setFitnessRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function retrieveData() {
    try {
      const response = await fetchPublicShare();
      setFitnessRecords(response?.formattedData || []);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  }
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="ShareContainer">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        fitnessRecords.map((fitnessRecord) => (
          <div className="Item" key={fitnessRecord.UserName}>
            <h1>{fitnessRecord.UserName}</h1>
            <h3>Total Time tracked: {fitnessRecord.totalTime}</h3>
            <h3>Total calories burned: {fitnessRecord.totalCalories}</h3>
            <h3>Heart Rate: {fitnessRecord.RestingHeart}</h3>
            <h3>Calories per day: {fitnessRecord.caloriesPerDay}</h3>
          </div>
        ))}
    </div>
  );
}

export default Share;
