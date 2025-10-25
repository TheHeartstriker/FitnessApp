import { useState } from "react";
import "./newDaily.css";
import Weight from "../../assets/icons2/weight.jsx";
import HeartFill from "../../assets/icons2/heartFill.jsx";
import Mug from "../../assets/icons2/mug.jsx";
import { underStandingZonesText, loggingInstructionsText } from "./text.js";
function NewDaily() {
  const [zone, setZone] = useState(1);

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
              <input type="text" placeholder="Enter your weight!" />
            </div>
          </div>
          <button className="daily-submit-button">Submit</button>
        </div>
        {/*  */}
        {/* Input for heart rate */}
        <div className="daily-submit-container">
          <div className="daily-input-container">
            <HeartFill />
            <div className="daily-input">
              <h3>Average heartrate</h3>
              <input type="text" placeholder="Enter your heart rate!" />
            </div>
          </div>
          <button className="daily-submit-button">Submit</button>
        </div>
        {/*  */}
        {/* Input for hydration */}
        <div className="daily-submit-container">
          <div className="daily-input-container">
            <Mug />
            <div className="daily-input">
              <h3>Workout time</h3>
              <input type="text" placeholder="Enter your time spent in" />
            </div>
          </div>
          <button className="daily-submit-button">Submit</button>
        </div>
      </section>
    </div>
  );
}
export default NewDaily;
