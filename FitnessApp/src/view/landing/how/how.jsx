import "./how.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import HowAni from "./howAni";
function How() {
  return (
    <section className="how-section">
      <HowAni />
      {/*  */}
      {/* Left side text, cards and divider */}
      {/*  */}
      <div className="how-section-left">
        {/*  */}
        {/* Header */}
        <div className="how-section-left-header">
          <h2> How FGraphs works and</h2>
          <h2> why it was created</h2>
          <p>{lorem + smallLorem}</p>
        </div>
        {/*  */}
        {/* cards and divider */}
        <div className="how-section-left-content">
          {/* Divider */}
          <div className="how-section-left-content-divider">
            <h3>How it's used</h3>
            <hr></hr>
          </div>
          {/* Card container and cards */}
          <div className="how-section-left-content-cards">
            <div className="how-section-left-content-cards-item">
              <h3>Login</h3>
              <p>{lorem}</p>
            </div>
            <div className="how-section-left-content-cards-item">
              <h3>Login</h3>
              <p>{lorem}</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Right side card*/}
      {/*  */}
      <div className="how-section-right">
        <InfoLine text="Some info" />
        <div className="how-section-right-text">
          <h3>
            Here <br />
            I need to <br />
            put random text
          </h3>
          <p>{lorem}</p>
        </div>
      </div>
    </section>
  );
}

export default How;
