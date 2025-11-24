import "./preview.css";
import { PreviewElement } from "@/components/landing/previewElement";
import { accountText01, inputDataText02, consistencyText03 } from "./text";
import { splitText } from "animejs";
import { useEffect } from "react";
import { animateText } from "@/components/animation/textAni";
import { animateLeftRight } from "@/components/animation/regularAni";
function Preview() {
  function animatePreviewSection() {
    const allElements = document.querySelectorAll(
      ".preview-main-content, .preview-main-content--middle"
    );
    const { words: previewHeaderWords } = splitText(".preview-header h3", {
      words: { wrap: "clip" },
    });
    previewHeaderWords.forEach((word) => {
      word.style.opacity = 0;
    });
    animateText(previewHeaderWords);
    animateLeftRight(allElements[0], -50, 0);
    animateLeftRight(allElements[1], 50, 0);
    animateLeftRight(allElements[2], -50, 0);
  }
  useEffect(() => {
    animatePreviewSection();
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
