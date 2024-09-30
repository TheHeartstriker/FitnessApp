import { useEffect, useState, useRef } from "react";

function Daily() {
  //Todays data
  const [DailyData, setDailyData] = useState([]);
  //Data used to update the daily data
  const [workoutTime, setWorkoutTime] = useState(0);
  const [restingHeartRate, setRestingHeartRate] = useState(0);
  const [weight, setWeight] = useState(0);
  const [zone, setZone] = useState("Zone1");

  const workoutTimeRef = useRef(null);
  const restingHeartRateRef = useRef(null);
  const weightRef = useRef(null);
  //Update workout time, resting heart rate and weight
  const updateWorkoutTime = (time) => {
    if (time < 0 || time != parseInt(time)) {
      alert("Please enter a valid time");
      return;
    }
    setWorkoutTime(time);
  };
  //Resting
  const updateRestingHeartRate = (rate) => {
    if (rate < 0 || rate > 135) {
      alert("Please go see a doctor");
      return;
    }
    if (rate != parseInt(rate)) {
      alert("Please enter a valid heart rate");
      return;
    }

    setRestingHeartRate(rate);
  };
  //Weight
  const updateWeight = (weight) => {
    if (weight < 0 || weight != parseInt(weight)) {
      alert("Please enter a valid weight");
      return;
    }
    setWeight(weight);
  };
  //Submit the resting heart rate, weight and workout time
  const submitRestingHeartRate = (rate) => {
    setDailyData((prevData) => ({
      ...prevData,
      HeartRate: parseInt(rate, 10),
    }));
    restingHeartRateRef.current.value = "";
  };
  //weight
  const submitWeight = (weight) => {
    setDailyData((prevData) => ({
      ...prevData,
      weight: parseInt(weight, 10),
    }));
    weightRef.current.value = "";
  };
  //workout time
  function UpdateTime() {
    setDailyData((prevData) => ({
      ...prevData,
      [zone]: (Number(prevData[zone]) || 0) + Number(workoutTime),
    }));
    workoutTimeRef.current.value = "";
  }
  //Update the zone
  const updateZone = (zone) => {
    setZone(zone);
  };

  function CreateData() {
    const DailyData = {
      Zone1: 0,
      Zone2: 0,
      Zone3: 0,
      Zone4: 0,
      Zone5: 0,
      weight: 0,
      HeartRate: 0,
    };

    setDailyData(DailyData);
  }

  //Server requests split into three functions to reduce confusion
  async function saveWorkoutTime() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workoutTime: workoutTime, workoutZone: zone }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/daily/workoutTime",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveRestingHeartRate() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ restingHeartRate: restingHeartRate }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/daily/restingHeartRate",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveWeight() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight: weight }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/daily/weight",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    CreateData();
  }, []);

  useEffect(() => {
    console.log(DailyData);
  }, [DailyData]);

  return (
    <div className="DailyPageContainer">
      <div className="InputContainer">
        <input
          ref={workoutTimeRef}
          className="WorkHeart"
          type="text"
          placeholder="Enter workout time in minutes"
          onChange={(e) => updateWorkoutTime(e.target.value)}
        ></input>
        <button className="Submit" onClick={UpdateTime}>
          Save
        </button>

        <input
          ref={restingHeartRateRef}
          className="WorkHeart"
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
          className="WorkHeart"
          type="text"
          placeholder="Daily weight"
          onChange={(e) => updateWeight(e.target.value)}
        ></input>
        <button className="Submit" onClick={() => submitWeight(weight)}>
          Save
        </button>
      </div>

      <div className="ZoneContainer">
        <div className="Zone">
          <button className="ZoneButton" onClick={() => updateZone("Zone1")}>
            Zone 1
          </button>
          <h5>
            When your heart beats at 50-60% of your maximum heart rate while
            exercising for between 20–40 minutes
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton" onClick={() => updateZone("Zone2")}>
            Zone 2
          </button>
          <h5>When your heart beats at 60-70% of your maximum heart rate</h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton" onClick={() => updateZone("Zone3")}>
            Zone 3
          </button>
          <h5>
            Exercising for 10–40 minutes with a heartbeat of 70-80% of your
            maximum heart rate
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton" onClick={() => updateZone("Zone4")}>
            Zone 4
          </button>
          <h5>
            Exercising at 80-90% of your maximum heart rate for between 2–10
            minutes
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton" onClick={() => updateZone("Zone5")}>
            Zone 5
          </button>
          <h5>A heart rate at 90-100% of your maximum heart rate</h5>
        </div>
      </div>
    </div>
  );
}

export default Daily;
