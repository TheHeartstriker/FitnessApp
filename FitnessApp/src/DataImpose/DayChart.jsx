import { useEffect, useState } from "react";
import * as d3 from "d3";

function DayChart({ dataprop, TimeProp }) {
  const data = dataprop;
  const Time = TimeProp;
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);
  async function createTimeArr() {
    const validFrames = {
      week: 7,
      month: 30,
      year: 365,
    };
    const days = validFrames[Time.toLowerCase()];
    if (days) {
      setTimeArr(Array(days).fill(0));
    } else {
      console.error("Invalid Time Frame");
    }
  }

  async function fillTimeArr() {
    let days = 0;
    //To track the date we are trying to find data for
    let currentDate = new Date();
    let tempTimeArr = Array(timeArr.length).fill(0);

    for (let i = 0; i < timeArr.length; i++) {
      //The date we are checking this increment
      const recordDate = data[data.length - days - 1].DateRecorded;
      //We check if the date we are checking is the same as the date in the data
      console.log(currentDate.toISOString());
      console.log(recordDate);
      if (
        //We remove the time from the date and compare
        currentDate.toISOString().split("T")[0] === recordDate.split("T")[0]
      ) {
        let TempCal = 0;
        TempCal += data[data.length - days - 1].Zone1Time * 4.5;
        TempCal += data[data.length - days - 1].Zone2Time * 7.5;
        TempCal += data[data.length - days - 1].Zone3Time * 11;
        TempCal += data[data.length - days - 1].Zone4Time * 14.5;
        TempCal += data[data.length - days - 1].Zone5Time * 16.5;
        console.log(TempCal);
        tempTimeArr[days] = TempCal;
      } else {
        // If no data is available for the day
        tempTimeArr[days] = 0;
      }
      //Move to the day before
      currentDate.setDate(currentDate.getDate() - 1);
      days += 1;
    }
    setTimeArr(tempTimeArr);
  }

  function drawBar(svg, x, y, width, height, color) {
    svg
      .append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color);
  }

  function MainCall() {
    let svgPointer = d3.select("#chart").select("svg");

    if (svgPointer.empty()) {
      svgPointer = d3
        .select("#chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    }
    drawBar(svgPointer, 0, 0, 100, 100, "red");
    drawBar(svgPointer, 100, 0, 100, 100, "blue");
  }

  useEffect(() => {
    MainCall();
    return () => {
      d3.select("#chart").select("svg").remove();
    };
  }, [timeArr]);

  useEffect(() => {
    createTimeArr().then(() => {
      if (timeArr.length > 0) {
        fillTimeArr();
      }
    });
  }, [Time]);

  return <div id="chart" className="DayChart"></div>;
}

export default DayChart;
