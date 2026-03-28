import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
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
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [cardText, cardIcons],
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
    const header = document.querySelectorAll(
      ".benefits-section-header-text h2",
    );

    animateText(
      { start: -75, end: 0 },
      [header],
      tl,
      {
        duration: 0.7,
        easing: "bounce.out",
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
