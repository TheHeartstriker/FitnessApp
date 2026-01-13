import "./newShare.css";
import { fetchPublicShare } from "../../services/apiFitness.jsx";
import { useState, useEffect, useRef } from "react";
import PeopleIcon from "../../assets/icons/people.jsx";
import { getShareInfo, updateShare } from "../../services/apiFitness.jsx";
import gsap from "gsap";
function NewShare() {
  const [fitnessRecords, setFitnessRecords] = useState([]);
  const [errorRecords, setErrorRecords] = useState(null);
  const [errorShare, setErrorShare] = useState(null);
  const [share, setShare] = useState(true);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
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
  function handleShareToggle() {
    const next = !share;
    setShare(next);
    updateShare();

    gsap.to(buttonRef.current, {
      xPercent: next ? 100 : 0,
      duration: 0.4,
      overwrite: "auto",
    });
    gsap.to(textRef.current, {
      xPercent: next ? -100 : 0,
      duration: 0.4,
      overwrite: "auto",
    });
  }

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    fetchShareStatus();
  }, []);

  return (
    <>
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
      </div>

      <div className="share-button-container">
        <button
          ref={buttonRef}
          className="share-button"
          onClick={handleShareToggle}
        >
          <PeopleIcon />
        </button>
        <div ref={textRef} className="share-button-text">
          <h3>{share ? "You are sharing!" : "You are not sharing!"}</h3>
        </div>
      </div>
    </>
  );
}

export default NewShare;
