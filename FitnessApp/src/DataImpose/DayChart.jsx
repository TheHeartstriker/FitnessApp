import { useState, useEffect } from "react";
import * as d3 from "d3";

function DayChart() {
  useEffect(() => {
    DrawLine(0, 0, 500, 500);
  }, []);
  return <div id="chart" className="DayChart"></div>;
}

export default DayChart;
