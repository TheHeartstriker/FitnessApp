import { useEffect, useRef } from "react";
import gsap from "gsap";
import { lorem, smallLorem } from "@/utils/text";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import PlusSm from "@/../public/icons/plus-sm";

function BenefitsEl({ active, title, onMouseEnter }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    gsap.to(bottomRef.current, {
      height: active ? "auto" : 0,
      duration: 0.6,
      ease: "myBounce",
    });
  }, [active]);

  return (
    <div
      className="benefits-section-image-right-item"
      onMouseEnter={onMouseEnter}
    >
      <div className="benefits-section-image-right-item-top">
        <h3>{title}</h3>
        <div className="benefits-section-image-right-item-top-icon">
          <PlusSm />
        </div>
      </div>
      <div ref={bottomRef} className="benefits-section-image-right-item-bottom">
        <div className="benefits-section-image-right-item-bottom-info">
          <p>{lorem + smallLorem}</p>
          <div className="benefits-section-image-right-item-bottom-info-text">
            <h4>Review other's</h4>
            <div className="benefits-section-image-right-item-bottom-info-text-icon">
              <ArrowSmRight />
            </div>
          </div>
        </div>
        <div className="benefits-section-image-right-item-bottom-image">
          <img src="/landing/grid.png" alt="Benefit 4" />
        </div>
      </div>
    </div>
  );
}

export default BenefitsEl;
