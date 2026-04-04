import "./layoutGuide.css";
function LayoutGuide({ columns, margin, gutter }) {
  const containerStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    columnGap: gutter,
    paddingLeft: margin,
    paddingRight: margin,
  };

  return (
    <div className="layoutGuide-container" style={containerStyle}>
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index} className="layoutGuide-container-column"></div>
      ))}
    </div>
  );
}

export default LayoutGuide;
