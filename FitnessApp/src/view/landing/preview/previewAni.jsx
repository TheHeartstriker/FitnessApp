import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";

const IMAGE_DURATION = 0.7;
const BOTTOM_DURATION = 0.4;
const TEXT_DURATION = 0.6;

function PreviewAni() {
  //
  // Image animation
  //
  function elAnimation1(tl) {
    const previewImages = document.querySelectorAll(
      ".preview-section-images-container-item",
    );
    const stats = document.querySelectorAll(
      ".preview-section-images-stats-item",
    );

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [previewImages, stats],
      {
        duration: IMAGE_DURATION,
        delay: 0,
        stagger: 0.06,
        easing: "myBounce",
      },
      tl,
    );
  }
  //
  // Animate elements
  //
  function elAnimation2(tl) {
    const previewStats = document.querySelectorAll(".preview-section-ending *");

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [previewStats],

      {
        duration: BOTTOM_DURATION,
        delay: 0,
        stagger: 0.06,
        easing: "myBounce",
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
    animateText(
      { start: -75, end: 0 },
      [header, subHeader],
      tl,
      {
        duration: TEXT_DURATION,
        easing: "myBounce",
      },
      {
        start: "top 90%",
        end: "bottom 40%",
      },
    );
  }

  useEffect(() => {
    const tl1 = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });
    const tl3 = gsap.timeline({ paused: true });
    elAnimation1(tl1);
    elAnimation2(tl2);
    textAnimation(tl3);
  }, []);
}

export default PreviewAni;
