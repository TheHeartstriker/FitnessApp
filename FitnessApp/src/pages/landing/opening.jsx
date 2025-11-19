import { useEffect } from "react";
import "./opening.css";
import { animate } from "animejs";
function OpeningPage() {
  function runAnimation() {
    const target = document.querySelector(".opening-animation");

    // Set initial CSS variable
    target.style.setProperty("--opening-animation-circle-size", "-5px");

    // Animate x to the variable value
    animate(target, {
      "--opening-animation-circle-size": "100%",
      delay: 250,
      duration: 1250,
      easing: "inOutExpo",
      onComplete: () => {
        // Optionally hide the element after animation
        target.style.display = "none";
      },
    });
  }

  useEffect(() => {
    runAnimation();
  }, []);
  return <div className="opening-animation"></div>;
}

export default OpeningPage;
