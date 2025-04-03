import { useEffect, useState } from "react";
import * as d3 from "d3";

function DayChart({ dataprop, TimeProp }) {
  const Time = TimeProp;
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [data, setData] = useState([dataprop]);
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
  //Sort here so in fillTimeArr we can simply iterate at constant time instead of using find etc
  function sortByDate(arr) {
    setData(
      arr.sort((a, b) => new Date(b.DateRecorded) - new Date(a.DateRecorded))
    );
  }

  //Starts at current and goes backwards to fill the time array
  function fillTimeArr() {
    let dataIndex = 0;
    //To track the date we are trying to find data for
    let currentDate = new Date();
    let tempTimeArr = Array(timeArr.length).fill(0);
    for (let i = 0; i < tempTimeArr.length; i++) {
      //The date we are checking this increment
      let record = data[dataIndex];
      console.log("Record:", record);
      let recordDate = record
        ? new Date(record.DateRecorded).toISOString().split("T")[0]
        : null;
      //We check if the date we are checking is the same as the date in the data
      if (
        //We remove the time from the date and compare
        recordDate &&
        recordDate === currentDate.toISOString().split("T")[0]
      ) {
        let TempTime = 0;
        TempTime += data[dataIndex].Zone1Time;
        TempTime += data[dataIndex].Zone2Time;
        TempTime += data[dataIndex].Zone3Time;
        TempTime += data[dataIndex].Zone4Time;
        TempTime += data[dataIndex].Zone5Time;
        tempTimeArr[i] = TempTime;
        dataIndex += 1; // Move to the next record in data
      } else if (recordDate === null) {
        // If no data is available for that day we make it 0
        tempTimeArr[i] = 0;
      }
      //Move to the day before
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
    sortByDate(dataprop);
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
