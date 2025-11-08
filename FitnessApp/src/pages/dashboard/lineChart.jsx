import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./lineChart.css";
import { drawLineChart } from "./helpers/lineGraph";
function LineChart({ dataprop, TimeProp }) {
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);
  //Our graph circle sizes
  const drawDataRef = useRef({ background: 0, solid: 0, outline: 0 });

  //Create's a array in order from most recent to least recent based on TimeProp length
  //Fills timeArr with totalZoneTime values from dataprop
  async function fillTimeArr() {
    if (!dataprop || Object.keys(dataprop).length === 0) {
      setTimeArr(Array(TimeProp).fill(0));
      return;
    }

    // Convert dataprop to array if it's an object
    const dataArray = Array.isArray(dataprop)
      ? dataprop
      : Object.values(dataprop);

    let currentDate = new Date();
    let tempTimeArr = Array(TimeProp).fill(0);
    for (let i = 0; i < tempTimeArr.length; i++) {
      // Format currentDate as a string (YYYY-MM-DD) for comparison
      const currentDateString = currentDate.toLocaleDateString("en-CA");

      // Find a matching record for the current date
      const record = dataArray.find(
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

  function setCircleSizes() {
    //We are considering around a month or two
    if (TimeProp > 14 && TimeProp < 32) {
      drawDataRef.current = { background: 0, solid: 5, outline: 0 };
    }
    //We are considering over two months
    if (TimeProp > 64) {
      drawDataRef.current = { background: 0, solid: 0, outline: 0 };
    }

    if (TimeProp < 14) {
      drawDataRef.current = { background: 10, solid: 5, outline: 10 };
    }
  }

  //Main drawing function
  function MainCall() {
    let svgPointer = d3.select("#chart").select("svg");
    if (svgPointer.empty()) {
      svgPointer = d3
        .select("#chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    }
    // Clear previous content
    svgPointer.selectAll("*").remove();
    const PixelHeight = svgPointer.node().getBoundingClientRect().height;
    const PixelWidth = svgPointer.node().getBoundingClientRect().width;
    setCircleSizes();
    drawLineChart(
      svgPointer,
      PixelHeight,
      PixelWidth,
      timeArr,
      drawDataRef.current
    );
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

  return <div id="chart" className="line-chart"></div>;
}

export default LineChart;
