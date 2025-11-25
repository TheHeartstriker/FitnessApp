import Login from "../login/login.jsx";
import { ScrollDown } from "../../../utils/scroll";
import "./landing.css";
import TriAngleBackgroundAni from "./startPage";
import Featured from "../featured/featured.jsx";
import OpeningPage from "../opening.jsx";
import Why from "../why/why.jsx";
import Preview from "../preview/preview.jsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function LandingPage() {
  const hasAnimatedButtons = useRef(false);

  useEffect(() => {
    hasAnimatedButtons.current = false;

    // Split text into words
    const h1Split = new SplitText(".landing-content h1", { type: "words" });
    const h2Split = new SplitText("#landing-char-2", { type: "words" });
    const pSplit = new SplitText("p#landing-char", { type: "words" });

    // Set initial states
    gsap.set([h1Split.words, h2Split.words], { y: "100%", opacity: 0 });
    gsap.set(pSplit.words, { y: "100%", opacity: 0 });
    gsap.set(
      [".primary-action-btn", "#button-char", ".landing-button-section"],
      {
        y: 30,
        opacity: 0,
      }
    );

    // Create timeline
    const tl = gsap.timeline();
    // Animate h1 and h2 words
    tl.to([...h1Split.words, ...h2Split.words], {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.075,
      delay: 1,
    });
    // Animate p words
    tl.to(
      pSplit.words,
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.015,
      },
      "-=0.4"
    ); // Start slightly before previous animation ends

    // Animate buttons
    tl.to(
      [".primary-action-btn", "#button-char", ".landing-button-section"],
      {
        y: 0,
        opacity: 1,
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.8"
    );
    // Cleanup
    return () => {
      tl.kill();
      h1Split.revert();
      h2Split.revert();
      pSplit.revert();
    };
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
            <ScrollDown percent={100} className="primary-action-btn">
              Want to give it a try?
            </ScrollDown>
            <hr id="button-char"></hr>
            <button className="primary-action-btn circle-button">
              <a
                href="https://www.kadenwildauer.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                K
              </a>
            </button>
            <h3 id="button-char">More from me</h3>
          </div>
        </div>
      </section>
      <Why />
      <Featured />
      <Preview />
      <Login />
    </>
  );
}

export default LandingPage;
