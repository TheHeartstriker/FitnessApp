import { gsap } from "gsap/gsap-core";
import { animateText, animateBlocks } from "@/utils/animations";
import { useEffect } from "react";
import Login from "./login";
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
      { el: "top", scroll: "95%" },
      { el: "bottom", scroll: "40%" },
      [elInput, elSubmit],
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
    const headerRight = document.querySelectorAll(
      ".login-section-right-header h2",
    );
    const headerLeft = document.querySelectorAll(".login-section-left h4");

    animateText(
      { start: -75, end: 0 },
      [headerRight, headerLeft],
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

export default LoginAni;
