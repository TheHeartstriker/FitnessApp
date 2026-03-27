import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
function FeaturesAni() {
  //
  // Animate elements
  //
  function elAnimation1(tl) {
    const cardsLeft = document.querySelectorAll(
      ".features-section-intro-header-nav",
    );
    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [cardsLeft],
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
    const header = document.querySelectorAll(".features-section-intro h2");

    animateText({ start: -75, end: 0 }, [header], tl, {
      duration: 0.7,
      easing: "bounce.out",
    });
  }
  function elAnimation2(tl) {
    const card1 = document.querySelector(".features-section-current");
    const card2 = document.querySelector(".features-section-next-card");
    const elements = document.querySelectorAll(".features-section-next-nav");
    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [card1, card2, elements],
      {
        duration: 0.85,
        delay: 0,
        stagger: 0.15,
        easing: "bounce.out",
      },
      tl,
    );
  }

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    elAnimation1(tl);
    textAnimation(tl);
    elAnimation2(tl);
  }, []);
}

export default FeaturesAni;
