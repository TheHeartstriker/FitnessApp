import { useEffect } from "react";
import "./opening.css";
import { gsap } from "gsap";

function OpeningPage() {
  function runAnimation() {
    const target = document.querySelector(".opening-animation");

    // Set initial CSS variable
    target.style.setProperty("--opening-animation-circle-size", "-5px");

    // Animate the CSS variable
    gsap.to(target, {
      "--opening-animation-circle-size": "100%",
      delay: 0.25, // GSAP uses seconds, so 250ms = 0.25s
      duration: 2, // 1250ms = 1.25s
      ease: "expo.inOut",
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
