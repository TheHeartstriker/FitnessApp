import { useState } from "react";

function Daily() {
  return (
    <div className="DailyPageContainer">
      <div className="InputContainer">
        <input
          className="WorkHeart"
          type="text"
          placeholder="Enter workout time"
        ></input>
        <button className="Submit">Save</button>

        <input
          className="WorkHeart"
          type="text"
          placeholder="Average resting heartrate"
        ></input>
        <button className="Submit">Save</button>
      </div>

      <div className="ZoneContainer">
        <div className="Zone">
          <button className="ZoneButton">Zone 1</button>
          <h5>
            When your heart beats at 50-60% of your maximum heart rate while
            exercising for between 20–40 minutes
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton">Zone 1</button>
          <h5>When your heart beats at 60-70% of your maximum heart rate</h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton">Zone 1</button>
          <h5>
            Exercising for 10–40 minutes with a heartbeat of 70-80% of your
            maximum heart rate
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton">Zone 1</button>
          <h5>
            Exercising at 80-90% of your maximum heart rate for between 2–10
            minutes
          </h5>
        </div>

        <div className="Zone">
          <button className="ZoneButton">Zone 1</button>
          <h5>A heart rate at 90-100% of your maximum heart rate</h5>
        </div>
      </div>
    </div>
  );
}

export default Daily;
