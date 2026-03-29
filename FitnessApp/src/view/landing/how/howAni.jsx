import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
const TEXT_DURATION = 0.6;
const SLIDE_DURATION = 0.4;

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
        duration: TEXT_DURATION,
        easing: "myBounce",
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
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [cardsLeft, cardsRight],
      {
        duration: SLIDE_DURATION,
        delay: 0,
        stagger: 0.06,
        easing: "myBounce",
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
