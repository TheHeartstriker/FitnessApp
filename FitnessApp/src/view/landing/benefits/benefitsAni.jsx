import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";

const TEXT_DURATION = 0.6;
const ELEMENT_DURATION = 0.4;

function BenefitsAni() {
  //
  // Animate elements
  //
  function elAnimation1(tl) {
    const cardText = document.querySelectorAll(
      ".benefits-section-image-right-item-top h3",
    );
    const cardIcons = document.querySelectorAll(
      ".benefits-section-image-right-item-top-icon",
    );

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [cardText, cardIcons],
      {
        duration: ELEMENT_DURATION,
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
    const header = document.querySelectorAll(
      ".benefits-section-header-text h2",
    );

    animateText(
      { start: -75, end: 0 },
      [header],
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
    elAnimation1(tl1);
    textAnimation(tl2);
  }, []);
}

export default BenefitsAni;
