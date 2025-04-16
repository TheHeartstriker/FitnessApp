import { useEffect, useState } from "react";
import * as d3 from "d3";

function DayChart({ dataprop, TimeProp }) {
  const Time = TimeProp;
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);

  //Create a array of the length of the time frame in Timeprop
  function createTimeArr() {
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
  function fillTimeArr() {
    let dataIndex = 0;
    let currentDate = new Date(); // Todays date
    let tempTimeArr = Array(timeArr.length).fill(0);

    for (let i = 0; i < tempTimeArr.length; i++) {
      // Format currentDate as a string (YYYY-MM-DD) for comparison
      const currentDateString = currentDate.toLocaleDateString("en-CA");
      let record = dataprop[dataIndex];
      let recordDate = record?.DateRecorded;
      // Check if the record date matches the current date
      if (recordDate && recordDate === currentDateString) {
        let TempTime = 0;
        TempTime += dataprop[dataIndex].totalZoneTime;
        tempTimeArr[i] = TempTime;
      } else if (recordDate === null) {
        // If no data is available for that day, set it to 0
        tempTimeArr[i] = 0;
      }

      // Move to the previous day
      dataIndex += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setTimeArr(tempTimeArr);
  }
  //Draws into the graph based on the data in timeArr
  function DrawDailyGraph(svg, pixelH, pixelW) {
    const reversedTemp = [...timeArr].reverse();
    let xVal = 0;
    let gap = 5;
    if (timeArr.length > 100) {
      gap = 0;
    }
    const barWidth = pixelW / timeArr.length - gap;
    for (let i = 0; i < reversedTemp.length; i++) {
      const barHeight = reversedTemp[i] * 3;
      drawBar(
        svg,
        // Positioning of the bar
        xVal,
        pixelH - barHeight,
        // Width
        barWidth,
        // Height
        barHeight,
        "blue"
      );
      xVal += barWidth + gap;
    }
  }
  //Helper function to draw the bars
  function drawBar(svg, x, y, width, height, color) {
    svg
      .append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color);
  }
  //This is the main call we create the svg of defined size and call the related functions to fill it
  function MainCall() {
    let svgPointer = d3.select("#chart").select("svg");
    if (svgPointer.empty()) {
      svgPointer = d3
        .select("#chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    }

    const PixelHeight = svgPointer.node().getBoundingClientRect().height;
    const PixelWidth = svgPointer.node().getBoundingClientRect().width;
    DrawDailyGraph(svgPointer, PixelHeight, PixelWidth);
  }

  useEffect(() => {
    createTimeArr();
  }, [Time]);

  useEffect(() => {
    if (timeArr.length > 0) {
      fillTimeArr();
    }
  }, [timeArr.length]);

  useEffect(() => {
    MainCall();
    return () => {
      d3.select("#chart").select("svg").remove();
    };
  }, [timeArr, Time]);
  return <div id="chart" className="DayChart"></div>;
}

export default DayChart;
