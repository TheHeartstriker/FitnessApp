import { useEffect, useState, useRef } from "react";
import "./Daily.css";
import { formatDateToMySQL } from "../../utils/funcUtil";
import { saveData, getShareInfo, updateShare } from "../../services/apiFitness";
import ZoneTime from "../../components/daily/index.jsx";
import zoneDescriptions from "./text.js";
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
  function setValue(value, set) {
    if (isNaN(value)) {
      return;
    }
    set(value);
  }

  async function submit(dbName, value, date, ref) {
    try {
      await saveData(dbName, value, date);
      ref.current.value = "";
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
        setShare(share.shared);
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
          onChange={(e) => setValue(e.target.value, setWorkoutTime)}
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
          onChange={(e) => setValue(e.target.value, setRestingHeartRate)}
        ></input>
        <button
          className="Submit"
          onClick={() =>
            submit(
              "resting_heart",
              restingHeartRate,
              currentDate,
              restingHeartRateRef
            )
          }
        >
          Save
        </button>

        <input
          ref={weightRef}
          className="WorkHeartTime"
          type="text"
          placeholder="Daily weight"
          onChange={(e) => setValue(e.target.value, setWeight)}
        ></input>
        <button
          className="Submit"
          onClick={() => submit("weight", weight, currentDate, weightRef)}
        >
          Save
        </button>
      </div>

      <div className="ZoneContainer">
        <ZoneTime
          zone={zone}
          num={1}
          updateZone={updateZone}
          text={zoneDescriptions.Zone1Time}
        />
        <ZoneTime
          zone={zone}
          num={2}
          updateZone={updateZone}
          text={zoneDescriptions.Zone2Time}
        />
        <ZoneTime
          zone={zone}
          num={3}
          updateZone={updateZone}
          text={zoneDescriptions.Zone3Time}
        />
        <ZoneTime
          zone={zone}
          num={4}
          updateZone={updateZone}
          text={zoneDescriptions.Zone4Time}
        />
        <ZoneTime
          zone={zone}
          num={5}
          updateZone={updateZone}
          text={zoneDescriptions.Zone5Time}
        />
      </div>
    </div>
  );
}

export default Daily;
