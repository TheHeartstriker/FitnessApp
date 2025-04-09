import { useEffect, useState, useRef } from "react";
import "./Daily.css";
import { formatDateToMySQL } from "../../Utils/FuncUtil";
import { saveData, getShareInfo, updateShare } from "../../Services/ApiFitness";
function Daily() {
  //Specific state for the daily page
  const [workoutTime, setWorkoutTime] = useState(0);
  const [restingHeartRate, setRestingHeartRate] = useState(0);
  const [weight, setWeight] = useState(0);
  const [zone, setZone] = useState("Zone1Time");
  //Refrences the text input fields
  const workoutTimeRef = useRef(null);
  const restingHeartRateRef = useRef(null);
  const weightRef = useRef(null);
  //Current date from user
  const currentDate = formatDateToMySQL(new Date());
  //Share state
  const [Share, setShare] = useState(false);

  //Handlers for the input fields
  function updateWorkoutTime(time) {
    if (isNaN(time)) {
      return;
    }
    setWorkoutTime(time);
  }
  function updateRestingHeartRate(rate) {
    if (isNaN(rate)) {
      return;
    }
    setRestingHeartRate(rate);
  }
  function updateWeight(weight) {
    if (isNaN(weight)) {
      return;
    }
    setWeight(weight);
  }

  // Handlers for the submit button handles resting heart rate, weight, and workout time sends data through the api
  async function submitRestingHeartRate(rate) {
    try {
      await saveData("resting_heart", rate, currentDate);

      restingHeartRateRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }
  async function submitWeight(weight) {
    try {
      await saveData("weight", weight, currentDate);

      weightRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }
  async function UpdateTime() {
    try {
      await saveData(zone, workoutTime, currentDate);

      workoutTimeRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }
  //Update the share value in the database
  function updateZone(zone) {
    setZone(zone);
  }
  //Helper if true set to false and vice versa
  //Local state switch
  function ReShare(share) {
    if (share === true) {
      setShare(false);
    } else {
      setShare(true);
    }
  }

  //Get share information from the database
  useEffect(() => {
    async function awaitShare() {
      try {
        const share = await getShareInfo();
        setShare(share);
      } catch (error) {
        console.error("Error fetching share info:", error);
      }
    }
    awaitShare();
  }, []);

  return (
    <div className="DailyPageContainer">
      <button
        className={`ShareButton ${Share ? "True" : "False"}`}
        onClick={() => {
          updateShare(), ReShare(Share);
        }}
      >
        {Share ? "Sharing with others" : "Not Sharing"}
      </button>
      <div className="InputContainer">
        <span className="Tooltip">?</span>
        <input
          ref={workoutTimeRef}
          className="WorkHeartTime"
          type="text"
          placeholder="Enter workout time in minutes"
          onChange={(e) => updateWorkoutTime(e.target.value)}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        ></input>
        <button className="Submit" onClick={UpdateTime}>
          Save
        </button>

        <input
          ref={restingHeartRateRef}
          className="WorkHeartTime"
          type="text"
          placeholder="Average resting heartrate"
          onChange={(e) => updateRestingHeartRate(e.target.value)}
        ></input>
        <button
          className="Submit"
          onClick={() => submitRestingHeartRate(restingHeartRate)}
        >
          Save
        </button>

        <input
          ref={weightRef}
          className="WorkHeartTime"
          type="text"
          placeholder="Daily weight"
          onChange={(e) => updateWeight(e.target.value)}
        ></input>
        <button className="Submit" onClick={() => submitWeight(weight)}>
          Save
        </button>
      </div>

      <div className="ZoneContainer">
        <div className={`Zone ${zone === "Zone1Time" ? "OnZone" : ""}`}>
          <button
            className="ZoneButton"
            onClick={() => updateZone("Zone1Time")}
          >
            Zone 1
          </button>
          <h5>
            When your heart beats at 50-60% of your maximum heart rate while
            exercising for between 20–40 minutes
          </h5>
        </div>

        <div className={`Zone ${zone === "Zone2Time" ? "OnZone" : ""}`}>
          <button
            className="ZoneButton"
            onClick={() => updateZone("Zone2Time")}
          >
            Zone 2
          </button>
          <h5>When your heart beats at 60-70% of your maximum heart rate</h5>
        </div>

        <div className={`Zone ${zone === "Zone3Time" ? "OnZone" : ""}`}>
          <button
            className="ZoneButton"
            onClick={() => updateZone("Zone3Time")}
          >
            Zone 3
          </button>
          <h5>
            Exercising for 10–40 minutes with a heartbeat of 70-80% of your
            maximum heart rate
          </h5>
        </div>

        <div className={`Zone ${zone === "Zone4Time" ? "OnZone" : ""}`}>
          <button
            className="ZoneButton"
            onClick={() => updateZone("Zone4Time")}
          >
            Zone 4
          </button>
          <h5>
            Exercising at 80-90% of your maximum heart rate for between 2–10
            minutes
          </h5>
        </div>

        <div className={`Zone ${zone === "Zone5Time" ? "OnZone" : ""}`}>
          <button
            className="ZoneButton"
            onClick={() => updateZone("Zone5Time")}
          >
            Zone 5
          </button>
          <h5>A heart rate at 90-100% of your maximum heart rate</h5>
        </div>
      </div>
    </div>
  );
}

export default Daily;
