import { useEffect, useState } from "react";

function BarChart({ graphData }) {
  const [zoneDivs, setZoneDivs] = useState([]);

  useEffect(() => {
    console.log("BarChart received graphData:", graphData);
    if (!graphData || graphData.length === 0) return;
    console.log("Graph Data:", graphData);
    const totals = graphData[0]?.totalTimeZones;
    if (!totals) return;

    const zoneKeys = Object.keys(totals);
    const divs = zoneKeys.map((key, idx) => (
      <>
        <div key={idx} className="dashboard-bar-zone">
          <h4>{totals[key]}</h4>
        </div>
      </>
    ));
    setZoneDivs(divs);
  }, [graphData]);

  return <>{zoneDivs}</>;
}

export default BarChart;
