import Login from "../login/login.jsx";
import { ScrollDown } from "../../../utils/scroll";
import "./landing.css";
import TriAngleBackgroundAni from "./startPage";
import Featured from "../featured/featured.jsx";
import OpeningPage from "../opening.jsx";
import { animate, splitText, stagger } from "animejs";
import { useEffect, useRef } from "react";
function LandingPage() {
  const hasAnimatedButtons = useRef(false);
  useEffect(() => {
    hasAnimatedButtons.current = false;
    // Collecting h words
    const { words: h1Words } = splitText(".landing-content h1 ", {
      words: { wrap: "clip" },
    });
    const { words: h2Words } = splitText("#landing-char-2", {
      words: { wrap: "clip" },
    });
    const hWords = [...h1Words, ...h2Words];
    //Animating h words
    animate(hWords, {
      y: [{ to: ["100%", "0%"] }],
      opacity: [0, 1],
      ease: "out(3)",
      delay: stagger(75, { start: 750 }),
    });
    // Animate p tag with slower stagger
    const { words: pWords } = splitText("p#landing-char", {
      words: { wrap: "clip" },
    });
    animate(pWords, {
      y: [{ to: ["100%", "0%"] }],
      opacity: [0, 1],
      ease: "out(3)",
      delay: stagger(15, { start: 800 }),
      onComplete: () => {
        if (hasAnimatedButtons.current) return;
        hasAnimatedButtons.current = true;
        animate(".primary-action-btn, #button-char, .landing-button-section", {
          translateY: [{ from: 30, to: 0 }],
          opacity: [0, 1],
          duration: 1250,
          ease: "out(3)",
          delay: 100,
          once: true,
        });
      },
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
          <h2 id="landing-char-2">A simplistic take on fitness tracking</h2>
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
