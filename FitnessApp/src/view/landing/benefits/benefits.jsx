import "./benefits.css";
import { useEffect, useState } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import PlusSm from "@/../public/icons/plus-sm";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import BenefitsAni from "./benefitsAni";
import BenefitsEl from "./benefitsEl";
function Benefits() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="benefits-section">
      {/*  */}
      {/* Benefits top section */}
      {/*  */}
      <BenefitsAni />
      <div className="benefits-section-header">
        <InfoLine text="Some info" reverse={true} />
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
          <BenefitsEl
            active={activeIndex === 0}
            title="Health"
            onMouseEnter={() => setActiveIndex(0)}
          />
          {/* Element 2 */}
          <BenefitsEl
            active={activeIndex === 1}
            title="Sleep"
            onMouseEnter={() => setActiveIndex(1)}
          />
          {/* Element 3 */}
          <BenefitsEl
            active={activeIndex === 2}
            title="Activity"
            onMouseEnter={() => setActiveIndex(2)}
          />
          {/* Element 4 active */}
          <BenefitsEl
            active={activeIndex === 3}
            title="Nutrition"
            onMouseEnter={() => setActiveIndex(3)}
          />
        </div>
      </div>
    </section>
  );
}

export default Benefits;
