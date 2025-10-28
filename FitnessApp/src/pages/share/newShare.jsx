import "./newShare.css";
import { fetchPublicShare } from "../../services/apiFitness.jsx";
import { useState, useEffect } from "react";
import PeopleIcon from "../../assets/icons/people.jsx";
import { getShareInfo, updateShare } from "../../services/apiFitness.jsx";

function NewShare() {
  const [fitnessRecords, setFitnessRecords] = useState([]);
  const [errorRecords, setErrorRecords] = useState(null);
  const [errorShare, setErrorShare] = useState(null);
  const [share, setShare] = useState(true);
  //Collects all shared user data
  async function retrieveData() {
    try {
      const response = await fetchPublicShare();
      setFitnessRecords(response?.formattedData || []);
      setErrorRecords(null);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setErrorRecords(err.message || "An error occurred");
    }
  }
  //Collects individual user's share status
  async function fetchShareStatus() {
    try {
      const response = await getShareInfo();
      setShare(response.shared);
      setErrorShare(null);
    } catch (error) {
      console.error("Error fetching share info:", error);
      setErrorShare(error.message || "An error occurred");
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    fetchShareStatus();
  }, []);

  return (
    <div className="share-container">
      {errorRecords && <p>Record collecting Error: {errorRecords}</p>}
      {errorShare && <p>Individual share data Error: {errorShare}</p>}

      {!errorRecords &&
        fitnessRecords.map((fitnessRecord) => (
          <div className="share-item" key={fitnessRecord.UserName}>
            <h2>{fitnessRecord.UserName}</h2>
            <ul>
              <li>Total Time tracked: {fitnessRecord.totalTime}</li>
              <li>Heart Rate: {fitnessRecord.RestingHeart}</li>
              <li>Total Calories Burned: {fitnessRecord.totalCalories}</li>
              <li>Calories per day: {fitnessRecord.caloriesPerDay}</li>
            </ul>
          </div>
        ))}

      <div className="share-button-container">
        <button
          className={`share-button ${share ? "active" : ""}`}
          onClick={() => {
            setShare(!share);
            updateShare();
          }}
        >
          <PeopleIcon />
        </button>
        <div className={`share-button-text ${share ? "active" : ""}`}>
          <h3>{share ? "You are sharing!" : "You are not sharing!"}</h3>
        </div>
      </div>
    </div>
  );
}

export default NewShare;
