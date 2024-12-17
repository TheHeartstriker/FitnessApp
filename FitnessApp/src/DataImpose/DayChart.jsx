import { useEffect, useState } from "react";
import * as d3 from "d3";

function DayChart({ dataprop, TimeProp }) {
  const data = dataprop;
  const Time = TimeProp;
  const svgWidth = "100%";
  const svgHeight = "100%";
  const [timeArr, setTimeArr] = useState([]);
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
    let days = timeArr.length;
    let currentDate = new Date();
    while (days > 0) {
      let timeActive = 0;
      let currIterDate = data.find(
        (item) => item.DataReconrded === currentDate.toDateString()
      );
    }
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
    console.log(data);
    createTimeArr();
    MainCall();
    return () => {
      d3.select("#chart").select("svg").remove();
    };
  }, []);

  return <div id="chart" className="DayChart"></div>;
}

export default DayChart;
