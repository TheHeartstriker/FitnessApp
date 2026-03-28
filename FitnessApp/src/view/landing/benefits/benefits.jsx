import "./benefits.css";
import { useEffect } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import PlusSm from "@/../public/icons/plus-sm";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import BenefitsAni from "./benefitsAni";
function Benefits() {
  return (
    <section className="benefits-section">
      {/*  */}
      {/* Benefits top section */}
      {/*  */}
      <BenefitsAni />
      <div className="benefits-section-header">
        <InfoLine text="Some info" />
        <div className="benefits-section-header-text">
          <h2>
            The possible benefits of <br /> using a fitness tracker
          </h2>
          <p>{lorem}</p>
        </div>
      </div>
      {/*  */}
      {/* Benefits bottom image section */}
      {/*  */}
      <div className="benefits-section-image">
        {/*  */}
        {/* Left side image */}
        <div className="benefits-section-image-left">
          <img src="/landing/grid.png" alt="Left benefit" />
        </div>
        {/*  */}
        {/* Right side elements */}
        <div className="benefits-section-image-right">
          {/* Element 1 */}
          <div className="benefits-section-image-right-item">
            <div className="benefits-section-image-right-item-top">
              <h3>Health</h3>
              <div className="benefits-section-image-right-item-top-icon">
                <PlusSm />
              </div>
            </div>
          </div>
          {/* Element 2 */}
          <div className="benefits-section-image-right-item">
            <div className="benefits-section-image-right-item-top">
              <h3>Health</h3>
              <div className="benefits-section-image-right-item-top-icon">
                <PlusSm />
              </div>
            </div>
          </div>
          {/* Element 3 */}
          <div className="benefits-section-image-right-item">
            <div className="benefits-section-image-right-item-top">
              <h3>Health</h3>
              <div className="benefits-section-image-right-item-top-icon">
                <PlusSm />
              </div>
            </div>
          </div>
          {/* Element 4 active */}
          <div className="benefits-section-image-right-item">
            <div className="benefits-section-image-right-item-top">
              <h3>Health</h3>
              <div className="benefits-section-image-right-item-top-icon">
                <PlusSm />
              </div>
            </div>
            {/*  */}
            {/* Active element bottom section */}
            <div className="benefits-section-image-right-item-bottom">
              {/* Active info text */}
              <div className="benefits-section-image-right-item-bottom-info">
                <p>{lorem + smallLorem}</p>
                {/* Active info text icon */}
                <div className="benefits-section-image-right-item-bottom-info-text">
                  <h4>Review other's</h4>
                  <div className="benefits-section-image-right-item-bottom-info-text-icon">
                    <ArrowSmRight />
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="benefits-section-image-right-item-bottom-image">
                <img src="/landing/grid.png" alt="Benefit 4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
