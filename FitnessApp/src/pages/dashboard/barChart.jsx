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
    if (maxValue === 0 || isNaN(maxValue)) return 20;
    const percentage = (value / maxValue) * 80 + 20;
    return percentage;
  }

  useEffect(() => {
    // Always render five bars, even if graphData is null or missing values
    const zoneValues = zoneDataTypes.map((key) =>
      graphData && graphData[key] ? graphData[key] : 0
    );
    const maxZoneValue = Math.max(...zoneValues);

    const divs = zoneDataTypes.map((zoneKey, idx) => (
      <div
        key={zoneKey}
        className="dashboard-bar-zone"
        style={{
          height: `${calculateBarHeight(
            graphData && graphData[zoneKey] ? graphData[zoneKey] : 0,
            maxZoneValue
          )}%`,
        }}
      >
        <p>{graphData && graphData[zoneKey] ? graphData[zoneKey] : 0}</p>
      </div>
    ));
    setZoneDivs(divs);
  }, [graphData]);

  return <>{zoneDivs}</>;
}

export default BarChart;
