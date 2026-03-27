import "./features.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import FeaturesAni from "./featuresAni";
function Features() {
  return (
    <section className="features-section">
      <FeaturesAni />
      {/*  */}
      {/* Intro / header */}
      {/*  */}
      <div className="features-section-intro">
        {/*  */}
        {/* Intro / header */}
        <div className="features-section-intro-header">
          {/* Nav */}
          <div className="features-section-intro-header-nav">
            <div className="features-section-intro-header-nav-item">
              <h4>01</h4>
            </div>
            <hr />
            <h4>02</h4>
            <h4>03</h4>
            <h4>04</h4>
          </div>
          {/* Para */}
          <p>{lorem}</p>
        </div>
        <h2>
          Features, Direction <br />
          and strengths of <br />
          FGraphs
        </h2>
      </div>
      {/*  */}
      {/* Current card / feature */}
      {/*  */}
      <div className="features-section-current">
        <InfoLine text="Some info" />
        <div className="features-section-current-text">
          <h3>Nature</h3>
          <p>{lorem}</p>
        </div>
        <img src="/landing/grid.png" alt="Feature image" />
      </div>
      {/*  */}
      {/* Controler / next card */}
      {/*  */}
      <div className="features-section-next">
        <div className="features-section-next-card">
          <InfoLine text="Some info" />
          <div className="features-section-next-card-text">
            <h3>Nature</h3>
            <p>{lorem}</p>
          </div>
        </div>
        <div className="features-section-next-nav">
          <div className="features-section-next-nav-item">
            <ArrowSmRight />
          </div>
          <span></span>
          <span></span>
          <span></span>
          <div className="features-section-next-nav-item">
            <ArrowSmRight />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
