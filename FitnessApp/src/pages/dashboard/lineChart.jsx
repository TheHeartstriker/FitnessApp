import { useEffect, useState } from "react";
import * as d3 from "d3";
import "./lineChart.css";

function LineChart({ dataprop, TimeProp }) {
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);
  const colors = {};

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
    if (!dataprop || dataprop.length === 0) return;
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

  //Draws the line graph based on the data in timeArr
  function DrawDailyGraph(svg, pixelH, pixelW) {
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

    // Draw points
    svg
      .selectAll(".dot-gap")
      .data(reversedTemp)
      .enter()
      .append("circle")
      .attr("class", "dot-gap")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 10) // inner solid radius
      .attr("fill", "var(--color-4)");

    svg
      .selectAll(".dot-inner")
      .data(reversedTemp)
      .enter()
      .append("circle")
      .attr("class", "dot-inner")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))

      .attr("r", 5) // inner solid radius
      .attr("fill", "var(--color-1)");

    // Draw points (outer outlined circle with space)
    svg
      .selectAll(".dot-outer")
      .data(reversedTemp)
      .enter()
      .append("circle")
      .attr("class", "dot-outer")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 10) // outer outline radius, larger than inner
      .attr("fill", "none")
      .attr("stroke", "var(--color-1)")
      .attr("stroke-width", 2);
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

    // Clear previous content
    svgPointer.selectAll("*").remove();

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

  return <div id="chart" className="line-chart"></div>;
}

export default LineChart;
