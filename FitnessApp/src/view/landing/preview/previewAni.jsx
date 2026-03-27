import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
function PreviewAni() {
  //
  // Animate elements
  //
  function elAnimation1(tl) {
    const cardLeft = document.querySelector(
      ".preview-section-images-container-left",
    );
    const cardRight = document.querySelectorAll(
      ".preview-section-images-container-right",
    );
    const stats = document.querySelectorAll(".preview-section-images-stats");

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [cardLeft, cardRight, stats],
      {
        duration: 0.85,
        delay: 0,
        stagger: 0.15,
        easing: "bounce.out",
      },
      tl,
    );
  }
  //
  // Animate elements
  //
  function elAnimation2(tl) {
    const previewStats = document.querySelectorAll(".preview-section-ending");

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [previewStats],

      {
        duration: 0.85,
        delay: 0,
        stagger: 0.15,
        easing: "bounce.out",
      },
      tl,
    );
  }
  //
  // Animate text
  //
  function textAnimation(tl) {
    const header = document.querySelectorAll(".preview-section-header-text h2");
    const subHeader = document.querySelectorAll(
      ".preview-section-header-text-para h3",
    );
    animateText({ start: -75, end: 0 }, [header, subHeader], tl, {
      duration: 0.7,
      easing: "bounce.out",
    });
  }

  useEffect(() => {
    elAnimation1(gsap.timeline());
    elAnimation2(gsap.timeline());
    textAnimation(gsap.timeline());
  }, []);
}

export default PreviewAni;
