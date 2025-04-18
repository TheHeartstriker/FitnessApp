function ZoneTime({ zone, num, updateZone, text }) {
  return (
    <div className={`Zone ${zone === `Zone${num}Time` ? "OnZone" : ""}`}>
      <button
        className="ZoneButton"
        onClick={() => updateZone(`Zone${num}Time`)} // Dynamically set the zone
      >
        Zone {num}
      </button>
      <h5>{text}</h5>
    </div>
  );
}

export default ZoneTime;
