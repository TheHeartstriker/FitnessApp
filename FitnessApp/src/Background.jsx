import React, { useState, useEffect } from "react";

const BackgroundAnimation = () => {
  //Animation used in the login and register page needs to be split to avoid re rendering the balls as the user interacts with the page
  const [bubblePoints, setBubblePoints] = useState([]);
  //Create random points for bubbles and push them to the bubblePoints array
  useEffect(() => {
    const createBubblePoints = () => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({ i: Math.floor(Math.random() * 50) });
      }
      setBubblePoints(points);
    };

    createBubblePoints();
  }, []);
  //Render
  return (
    <div className="Background">
      {bubblePoints.map((point, index) => (
        <span key={index} style={{ "--i": point.i }}></span>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
