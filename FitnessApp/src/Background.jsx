import React, { useState, useEffect } from "react";

const BackgroundAnimation = () => {
  const [bubblePoints, setBubblePoints] = useState([]);

  useEffect(() => {
    const createBubblePoints = () => {
      const points = [];
      for (let i = 0; i < 30; i++) {
        points.push({ i: Math.floor(Math.random() * 50) });
      }
      setBubblePoints(points);
    };

    createBubblePoints();
  }, []);

  return (
    <div className="Background">
      {bubblePoints.map((point, index) => (
        <span key={index} style={{ "--i": point.i }}></span>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
