export function PreviewElement({ number, textHeader, textContent, middle }) {
  return (
    <div
      className={`preview-main-content ${
        middle ? "preview-main-content--middle" : ""
      }`}
    >
      <div className="preview-content-text">
        <h4>{textHeader}</h4>
        <p>{textContent}</p>
      </div>
      <div className="preview-content-num">
        <h4>{number}</h4>
      </div>
    </div>
  );
}
