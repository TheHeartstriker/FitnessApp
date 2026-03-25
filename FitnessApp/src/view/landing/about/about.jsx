import "./about.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
function About() {
  return (
    <section className="about-section">
      {/*  */}
      {/* Top intro header */}
      {/*  */}
      <div className="about-section-header">
        {/*  */}
        {/* Left side text */}
        <h2>
          About <br /> FGraph's
        </h2>
        {/*  */}
        {/* Right side text */}
        <div className="about-section-header-text">
          <h3>Why</h3>
          <div className="about-section-header-text-para">
            <p>{lorem}</p>
            <p>{smallLorem}</p>
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
            <InfoLine text="Some info" />
            <div className="about-section-cards-left-item-text">
              <h3>Learning</h3>
              <p>{lorem}</p>
            </div>
          </div>
          {/* Card two */}
          <div className="about-section-cards-left-item">
            <InfoLine text="Some info" />
            <div className="about-section-cards-left-item-text">
              <h3>Learning</h3>
              <p>{smallLorem + lorem}</p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Right side cards one large card*/}
        <div className="about-section-cards-right">
          {/* Top card text */}
          <div className="about-section-cards-right-text">
            <InfoLine text="Some info" />
            <h3>Learning</h3>
            <p>{lorem + smallLorem}</p>
          </div>
          {/* Bottom image */}
          <div className="about-section-cards-right-image">
            <img src="/landing/test1.jpg"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
