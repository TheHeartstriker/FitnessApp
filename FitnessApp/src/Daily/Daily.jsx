import { useEffect, useState, useRef } from "react";

function Daily() {
  //Todays data
  const [DailyData, setDailyData] = useState([]);
  //Data spent in a spefic zone
  const [workoutTime, setWorkoutTime] = useState(0);
  //Resting heart rate
  const [restingHeartRate, setRestingHeartRate] = useState(0);
  //Weight
  const [weight, setWeight] = useState(0);
  //Current zone the user has selected
  const [zone, setZone] = useState("Zone1Time");
  //Refrences the text input fields
  const workoutTimeRef = useRef(null);
  const restingHeartRateRef = useRef(null);
  const weightRef = useRef(null);
  //Share state
  const [Share, setShare] = useState(false);
  //Update workout time
  const updateWorkoutTime = (time) => {
    if (isNaN(time)) {
      return;
    }
    setWorkoutTime(time);
  };
  //Resting
  const updateRestingHeartRate = (rate) => {
    if (isNaN(rate)) {
      return;
    }
    setRestingHeartRate(rate);
  };
  //Weight
  const updateWeight = (weight) => {
    if (isNaN(weight)) {
      return;
    }
    setWeight(weight);
  };

  //Handlers for the submit button handles resting heart rate, weight and workout time
  const submitRestingHeartRate = async (rate) => {
    try {
      await saveData("resting_heart", rate);
      //Clear the input field
      restingHeartRateRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };
  //weight
  const submitWeight = async (weight) => {
    try {
      await saveData("weight", weight);
      //Clear the input field
      weightRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  //workout time
  const UpdateTime = async () => {
    try {
      await saveData(zone, workoutTime);
      //Clear the input field
      workoutTimeRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };
  //Update the current zone
  const updateZone = (zone) => {
    setZone(zone);
  };
  //Helper if true set to false and vice versa
  function ReShare(share) {
    if (share === true) {
      setShare(false);
    } else {
      setShare(true);
    }
  }

  //Sends data to the database to be saved
  async function saveData(DataName, Data) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ [DataName]: Data }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/updateDataPage`,
        options
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  //Checks if the user is sharing there data
  async function getShareInfo() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getShareInfo`,
        options
      );
      const data = await response.json();
      setShare(data);
      console.log(data, "Data from share");
    } catch (error) {
      console.error(error);
    }
  }

  async function UpdateShare() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/updateShare`,
        options
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  //Get
  useEffect(() => {
    getShareInfo();
  }, []);

  return (
    <div className="DailyPageContainer">
      <button
        className={`ShareButton ${Share ? "True" : "False"}`}
        onClick={() => {
          UpdateShare(), ReShare(Share);
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
