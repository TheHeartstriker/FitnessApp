import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
function HowAni() {
  //
  // Animate text
  //
  function textAnimation(tl) {
    const header = document.querySelectorAll(".how-section-left-header h2");
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
  //
  // Animate cards
  //
  function cardsAnimation(tl) {
    const cardsLeft = document.querySelectorAll(
      ".how-section-left-content-cards",
    );
    const cardsRight = document.querySelectorAll(".how-section-right");

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [cardsLeft, cardsRight],
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
    const tl1 = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });
    textAnimation(tl1);
    cardsAnimation(tl2);
  }, []);
}

export default HowAni;
