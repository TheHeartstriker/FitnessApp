import { ScrollDown } from "../../../utils/scroll";
import "./hero.css";
import TriAngleBackgroundAni from "./helper";

function HeroView() {
  return (
    <>
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
    </>
  );
}

export default HeroView;
