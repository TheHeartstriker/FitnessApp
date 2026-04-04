import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
const TEXT_DURATION = 0.6;
const INPUT_DURATION = 0.4;

function LoginAni() {
  //
  // Animate elements
  //
  function elAnimation1(tl) {
    const elInput = document.querySelectorAll(
      ".login-section-right-body-input",
    );
    const elSubmit = document.querySelectorAll(
      ".login-section-right-body-submit",
    );

    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      [elInput, elSubmit],
      {
        duration: INPUT_DURATION,
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
    const headerRight = document.querySelectorAll(
      ".login-section-right-header h2",
    );
    const headerLeft = document.querySelectorAll(".login-section-left h4");

    animateText(
      { start: -75, end: 0 },
      [headerRight, headerLeft],
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

export default LoginAni;
