import { useEffect, useState } from "react";

function BarChart({ graphData }) {
  const [zoneDivs, setZoneDivs] = useState([]);
  const zoneDataTypes = [
    "avgZone1Time",
    "avgZone2Time",
    "avgZone3Time",
    "avgZone4Time",
    "avgZone5Time",
  ];

  function calculateBarHeight(value, maxValue) {
    if (maxValue === 0) return 20; // Minimum height for zero values
    const percentage = (value / maxValue) * 80 + 20; // Scale from 20% to 100%
    return percentage;
  }

  useEffect(() => {
    if (!graphData || graphData.length === 0) return;

    // Extract zone values from graphData object
    const zoneValues = zoneDataTypes.map((key) => graphData[key] || 0);
    const maxZoneValue = Math.max(...zoneValues);

    const divs = zoneDataTypes.map((zoneKey, idx) => {
      if (graphData[zoneKey]) {
        return (
          <div
            key={zoneKey}
            className="dashboard-bar-zone"
            style={{
              height: `${calculateBarHeight(
                graphData[zoneKey],
                maxZoneValue
              )}%`,
            }}
          >
            <p>{graphData[zoneKey]}</p>
          </div>
        );
      }
      return null;
    });
    setZoneDivs(divs);
  }, [graphData]);

  return <>{zoneDivs}</>;
}

export default BarChart;
