import { ScrollButton } from "@/utils/scroll";
import "./hero.css";
import BackGroundGen from "@/components/backGroundGen";
import { header, subHeader, para } from "./text";

import HeroAni from "./heroAni";
import BackGround from "@/../public/landing/backGround";

function Hero() {
  return (
    <>
      <section className="landing-section">
        <div className="landing-section-svg">
          <BackGroundGen
            svgComponent={<BackGround />}
            parent={".landing-section-svg"}
          />
        </div>
        <HeroAni />
        <div className="landing-section-content">
          <h1>{header}</h1>
          <h2>{subHeader}</h2>
          <p>{para}</p>
          <div className="landing-section-content-details">
            <ScrollButton
              percent={1000}
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
