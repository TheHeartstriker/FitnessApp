import "./about.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import AboutAni from "./aboutAni";
import { para1, para2, card1, card2, card3 } from "./text";

function About() {
  return (
    <section className="about-section">
      <AboutAni />
      {/*  */}
      {/* Top intro header */}
      {/*  */}
      <div className="about-section-header">
        {/*  */}
        {/* Left side text */}
        <div className="about-section-header-container">
          <h2>About</h2>
          <h2>FGraphs</h2>
        </div>
        {/*  */}
        {/* Right side text */}
        <div className="about-section-header-text">
          <h3>Why</h3>
          <div className="about-section-header-text-para">
            <p>{para1}</p>
            <p>{para2}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Bottom cards */}
      {/*  */}
      <div className="about-section-cards">
        {/*  */}
        {/* Left side cards two small cards */}
        <div className="about-section-cards-left">
          {/* Card one */}
          <div className="about-section-cards-left-item">
            <InfoLine text="About" />
            <div className="about-section-cards-left-item-text">
              <h3>{card1.header}</h3>
              <p>{card1.para}</p>
            </div>
          </div>
          {/* Card two */}
          <div className="about-section-cards-left-item">
            <InfoLine text="About" />
            <div className="about-section-cards-left-item-text">
              <h3>{card2.header}</h3>
              <p>{card2.para}</p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Right side cards one large card*/}
        <div className="about-section-cards-right">
          {/* Top card text */}
          <div className="about-section-cards-right-text">
            <InfoLine text="About" />
            <h3>{card3.header}</h3>
            <p>{card3.para}</p>
          </div>
          {/* Bottom image */}
          <div className="about-section-cards-right-image">
            <img src={card3.imgSrc} alt={card3.header}></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
