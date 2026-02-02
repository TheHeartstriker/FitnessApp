import "./preview.css";
import { PreviewElement } from "@/components/landing/previewElement";
import { accountText01, inputDataText02, consistencyText03 } from "./text";
import { useEffect, useRef } from "react";
import { animateText } from "@/components/animation/textAni";
import { animateLeftRight } from "@/components/animation/regularAni";
const rootStyles = getComputedStyle(document.documentElement);
const normal3 = parseFloat(rootStyles.getPropertyValue("--duration-normal-3"));
function Preview() {
  function animatePreviewSection() {
    const allElements = document.querySelectorAll(
      ".preview-main-content, .preview-main-content--middle",
    );
    const previewHeader = document.querySelector(".preview-header h3");
    animateText([previewHeader]);
    const ani1 = animateLeftRight(allElements[0], normal3, -100, 0);
    const ani2 = animateLeftRight(allElements[1], normal3, 100, 0);
    const ani3 = animateLeftRight(allElements[2], normal3, -100, 0);
    return [ani1, ani2, ani3];
  }
  useEffect(() => {
    const animations = animatePreviewSection();
    return () => {
      animations.forEach((ani) => ani.kill());
    };
  }, []);

  return (
    <section className="preview-section">
      <div className="preview-header">
        <h3>Preview</h3>
      </div>
      <div className="preview-content">
        <PreviewElement
          number={"01"}
          textHeader={"Creating an Account"}
          textContent={accountText01}
          middle={false}
        />
        <PreviewElement
          number={"02"}
          textHeader={"Inputting Data"}
          textContent={inputDataText02}
          middle={true}
        />
        <PreviewElement
          number={"03"}
          textHeader={"Consistency "}
          textContent={consistencyText03}
          middle={false}
        />
      </div>
    </section>
  );
}

export default Preview;
