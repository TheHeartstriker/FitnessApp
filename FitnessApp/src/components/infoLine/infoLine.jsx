import "./infoLine.css";

function InfoLine({ text }) {
  return (
    <div className="infoLine">
      <hr></hr>
      <h5>{text}</h5>
    </div>
  );
}

export default InfoLine;
