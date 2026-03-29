import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
const NAV_DURATION = 0.4;
const TEXT_DURATION = 0.6;
const CARD_DURATION = 0.7;

function FeaturesAni() {
  //
  // Animate nav top left
  //
  function elAnimation1(tl) {
    const navBall = document.querySelectorAll(
      ".features-section-intro-header-nav-item",
    );
    const navLine = document.querySelectorAll(
      ".features-section-intro-header-nav hr",
    );
    const navText = document.querySelectorAll(
      ".features-section-intro-header-nav h4",
    );

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [navBall, navLine, navText],
      {
        duration: NAV_DURATION,
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
    const header = document.querySelectorAll(".features-section-intro h2");

    animateText({ start: -75, end: 0 }, [header], tl, {
      duration: TEXT_DURATION,
      easing: "myBounce",
    });
  }
  function elAnimation2(tl) {
    const card1 = document.querySelector(".features-section-current");
    const card2 = document.querySelector(".features-section-next-card");
    const elements = document.querySelectorAll(".features-section-next-nav *");
    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [card1, card2, elements],
      {
        duration: CARD_DURATION,
        delay: 0,
        stagger: 0.06,
        easing: "myBounce",
      },
      tl,
    );
  }

  useEffect(() => {
    const tl1 = gsap.timeline({ paused: true });
    elAnimation1(tl1);
    textAnimation(tl1);
    const tl2 = gsap.timeline({ paused: true });
    elAnimation2(tl2);
  }, []);
}

export default FeaturesAni;
