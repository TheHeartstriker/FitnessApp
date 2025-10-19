import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./lineChart.css";
function LineChart({ dataprop, TimeProp }) {
  const svgWidth = "100%";
  const svgHeight = "100%";
  const drawDataRef = useRef({ background: 10, solid: 5 });
  const [timeArr, setTimeArr] = useState([]);

  //Create's a array in order from most recent to least recent based on TimeProp length
  //Fills timeArr with totalZoneTime values from dataprop
  async function fillTimeArr() {
    if (!dataprop || Object.keys(dataprop).length === 0) return;

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
    if (TimeProp > 60) {
      drawDataRef.current = { background: 5, solid: 2.5 };
    }
  }

  //Draws the line graph based on the data in timeArr
  function DrawDailyGraph(svg, pixelH, pixelW, drawData) {
    const reversedTemp = [...timeArr].reverse();
    const maxValue = Math.max(...reversedTemp, 0);
    const padding = 40;

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, reversedTemp.length - 1])
      .range([padding, pixelW - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([pixelH - padding, padding]);

    // Create line generator
    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX); // Smooth curve

    // Draw the line
    svg
      .append("path")
      .datum(reversedTemp)
      .attr("fill", "none")
      .attr("stroke", "var(--color-3)")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Background fill so gap has no line
    svg
      .selectAll(".dot-gap")
      .data(reversedTemp)
      .enter()
      .append("circle")
      .attr("class", "dot-gap")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", drawData.background)
      .attr("fill", "var(--color-4)");
    // Solid middle point
    svg
      .selectAll(".dot-inner")
      .data(reversedTemp)
      .enter()
      .append("circle")
      .attr("class", "dot-inner")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))

      .attr("r", drawData.solid)
      .attr("fill", "var(--color-2)");

    // Outlined circle
    if (TimeProp < 28) {
      svg
        .selectAll(".dot-outer")
        .data(reversedTemp)
        .enter()
        .append("circle")
        .attr("class", "dot-outer")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", (d) => yScale(d))
        .attr("r", 10)
        .attr("fill", "none")
        .attr("stroke", "var(--color-1)")
        .attr("stroke-width", 2);
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
    DrawDailyGraph(svgPointer, PixelHeight, PixelWidth, drawDataRef.current);
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
