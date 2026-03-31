import "./infoLine.css";

function InfoLine({ text, reverse }) {
  return (
    <div className={`infoLine ${reverse ? "reverse" : ""}`}>
      <hr></hr>
      <h5>{text}</h5>
    </div>
  );
}

export default InfoLine;
