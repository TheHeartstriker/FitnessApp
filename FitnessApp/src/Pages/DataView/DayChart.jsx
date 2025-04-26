import { useEffect, useState } from "react";
import * as d3 from "d3";

function DayChart({ dataprop, TimeProp }) {
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);

  function timeToDays(time) {
    if (time === "week") {
      return 7;
    }
    if (time === "month") {
      return 30;
    }
    if (time === "year") {
      return 365;
    }
  }

  async function fillTimeArr() {
    let currentDate = new Date();
    let tempTimeArr = Array(timeToDays(TimeProp)).fill(0);
    for (let i = 0; i < tempTimeArr.length; i++) {
      // Format currentDate as a string (YYYY-MM-DD) for comparison
      const currentDateString = currentDate.toLocaleDateString("en-CA");

      // Find a matching record for the current date
      const record = dataprop.find(
        (item) => item.DateRecorded === currentDateString
      );

      if (record) {
        tempTimeArr[i] = record.totalZoneTime || 0;
      }

      // Move to the previous day
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
    async function fillData() {
      await fillTimeArr();
    }
    fillData();
  }, [TimeProp, dataprop]);

  useEffect(() => {
    MainCall();
    return () => {
      d3.select("#chart").select("svg").remove();
    };
  }, [timeArr]);

  return <div id="chart" className="DayChart"></div>;
}

export default DayChart;
