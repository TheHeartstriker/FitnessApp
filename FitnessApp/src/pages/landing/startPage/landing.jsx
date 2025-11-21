import Login from "../login/login.jsx";
import { ScrollDown } from "../../../utils/scroll";
import "./landing.css";
import TriAngleBackgroundAni from "./startPage";
import Featured from "../featured/featured.jsx";
import OpeningPage from "../opening.jsx";
import { animate, set, splitText, stagger } from "animejs";
import { useEffect } from "react";
function LandingPage() {
  useEffect(() => {
    const hTargets = document.querySelectorAll(
      "h1#landing-char, h2#landing-char, h3#landing-char"
    );
    const pTargets = document.querySelectorAll("p#landing-char");
    const landingButton = document.querySelectorAll(
      ".primary-action-btn, #button-char"
    );

    // Animate h tags with faster stagger
    hTargets.forEach((target) => {
      const { words } = splitText(target, {
        words: { wrap: "clip" },
      });
      animate(words, {
        y: [{ to: ["100%", "0%"] }],
        opacity: [0, 1],
        ease: "cubicBezier(0.7, 0.1,0.5,0.9)",
        delay: stagger(75, { start: 750 }), // Faster stagger for h tags
      });
    });

    // Animate p tag with slower stagger
    pTargets.forEach((target) => {
      const { words } = splitText(target, {
        words: { wrap: "clip" },
      });
      animate(words, {
        y: [{ to: ["100%", "0%"] }],
        opacity: [0, 1],
        ease: "cubicBezier(0.7, 0.1,0.5,0.9)",
        delay: stagger(15, { start: 800 }), // Slower stagger for p tag
      });
    });
    animate(landingButton, {
      translateY: [{ from: 20, to: 0 }],
      opacity: [0, 1],
      duration: 650,
      ease: "cubicBezier(0.7, 0.1,0.5,0.9)",
      delay: 2750,
    });
  }, []);

  return (
    <>
      <OpeningPage />
      <section className="landing-page">
        <div className="landing-background-svg">
          <div className="test-blur"></div>
          <TriAngleBackgroundAni />
        </div>
        <div className="landing-content">
          <h1 id="landing-char">FGraphs</h1>
          <h2 id="landing-char">A simplistic take on fitness tracking</h2>
          <p id="landing-char">
            Hi there! FGraphs is a fitness tracking app! Mainly made in my spare
            time to learn, have fun and showcase my skills and understanding of
            web development. But! Its also a pretty neat app to track your
            fitness if you into that.
          </p>
          <div className="landing-button-section">
            {/* btn1 */}
            <ScrollDown percent={100} className="primary-action-btn">
              Want to give it a try?
            </ScrollDown>
            {/* separator */}
            <hr id="button-char"></hr>
            {/*  */}
            {/* btn2 */}
            <ScrollDown percent={100} className="primary-action-btn circle-btn">
              K
            </ScrollDown>
            {/* Text */}
            <h3 id="button-char">More from me</h3>
          </div>
        </div>
      </section>
      <Featured />
      <Login />
    </>
  );
}

export default LandingPage;
