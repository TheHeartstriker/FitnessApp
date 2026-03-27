import { ScrollButton } from "@/utils/scroll";
import "./hero.css";
import TriAngleBackgroundAni from "./helper";
import HeroAni from "./heroAni";

function Hero() {
  return (
    <>
      <section className="landing-section">
        <div className="landing-section-svg">
          <TriAngleBackgroundAni />
        </div>
        <HeroAni />
        <div className="landing-section-content">
          <h1>FGraphs</h1>
          <h2>A simplistic take on fitness tracking</h2>
          <p>
            Hi there! FGraphs is a fitness tracking app! Mainly made in my spare
            time to learn, have fun and showcase my skills and understanding of
            web development. But! Its also a pretty neat app to track your
            fitness if you into that.
          </p>
          <div className="landing-section-content-details">
            <ScrollButton
              percent={125}
              className={"landing-section-content-details-button-1"}
            >
              <h3>Want to give it a try?</h3>
            </ScrollButton>
            <hr></hr>
            <button className="landing-section-content-details-button-2">
              <h3>K</h3>
              <a
                href="https://www.kadenwildauer.com"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </button>
            <h3>More from me</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
