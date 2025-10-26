import { useState } from "react";
import "./newDaily.css";
import Weight from "../../assets/icons2/weight.jsx";
import HeartFill from "../../assets/icons2/heartFill.jsx";
import Mug from "../../assets/icons2/mug.jsx";
import { formatDateToMySQL } from "../../utils/funcUtil.jsx";
import { useRef } from "react";
import { saveData } from "../../services/apiFitness.jsx";
import { underStandingZonesText, loggingInstructionsText } from "./text.js";
function NewDaily() {
  const [zone, setZone] = useState(1);
  const workoutTimeRef = useRef(null);
  const restingHeartRateRef = useRef(null);
  const weightRef = useRef(null);
  const currentDate = formatDateToMySQL(new Date());

  async function submit(dbName, value, date) {
    try {
      await saveData(dbName, value, date);
    } catch (error) {
      console.error(error);
    }
  }

  function stringName(zone) {
    return `Zone${zone}Time`;
  }

  function setNumber(ref, value, e) {
    if (!isNaN(value) && value.length <= 4) {
      ref.current.value = value;
    } else {
      ref.current.value = "";
    }
    return;
  }

  return (
    <div className="daily">
      <section className="daily-container-left">
        <div className="instruct-container">
          {/*  */}
          {/* Instruct card 1 */}
          <div className="instruct-card">
            <h2>Understanding Zones</h2>
            <pre>{underStandingZonesText}</pre>
          </div>
          {/*  */}
          {/* Instruct card 2 */}
          <div className="instruct-card">
            <h2>Choose Your Zone</h2>
            <p>{loggingInstructionsText}</p>
          </div>
        </div>
        <div className="zone-container">
          {[1, 2, 3, 4, 5].map((z) => (
            <button
              key={z}
              className={`zone-button${zone === z ? " active" : ""}`}
              onClick={() => setZone(z)}
            >
              <h4>Zone</h4>
              <h5>{z}</h5>
            </button>
          ))}
        </div>
      </section>
      <section className="daily-container-right">
        <div className="daily-submit-container">
          {/*  */}
          {/* Input for weight */}
          <div className="daily-input-container">
            <Weight />
            <div className="daily-input">
              <h3>Daily weight</h3>
              <input
                ref={weightRef}
                type="text"
                placeholder="Enter your weight!"
                onChange={(e) => setNumber(weightRef, e.target.value)}
              />
            </div>
          </div>
          <button
            className="daily-submit-button"
            onClick={() =>
              submit("weight", weightRef.current.value, currentDate)
            }
          >
            <h4>Submit</h4>
          </button>
        </div>
        {/*  */}
        {/* Input for heart rate */}
        <div className="daily-submit-container">
          <div className="daily-input-container">
            <HeartFill />
            <div className="daily-input">
              <h3>Average heartrate</h3>
              <input
                ref={restingHeartRateRef}
                type="text"
                placeholder="Enter your heart rate!"
                onChange={(e) => setNumber(restingHeartRateRef, e.target.value)}
              />
            </div>
          </div>
          <button
            className="daily-submit-button"
            onClick={() =>
              submit(
                "resting_heart",
                restingHeartRateRef.current.value,
                currentDate
              )
            }
          >
            <h4>Submit</h4>
          </button>
        </div>
        {/*  */}
        {/* Input for hydration */}
        <div className="daily-submit-container">
          <div className="daily-input-container">
            <Mug />
            <div className="daily-input">
              <h3>Workout time</h3>
              <input
                ref={workoutTimeRef}
                type="text"
                placeholder="Enter your time spent in"
                onChange={(e) => setNumber(workoutTimeRef, e.target.value)}
              />
            </div>
          </div>
          <button
            className="daily-submit-button"
            onClick={() =>
              submit(
                stringName(zone),
                workoutTimeRef.current.value,
                currentDate
              )
            }
          >
            <h4>Submit</h4>
          </button>
        </div>
      </section>
    </div>
  );
}
export default NewDaily;
