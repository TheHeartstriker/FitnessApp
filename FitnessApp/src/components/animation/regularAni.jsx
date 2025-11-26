import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateLeftRight(element, from, to) {
  // Set initial state
  gsap.set(element, {
    x: from,
    opacity: 0,
  });

  // Main animation
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 70%",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: to,
          duration: 1.25,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(element, {
          opacity: 0,
          x: from,
          duration: 1.25,
          ease: "power2.out",
        });
      },
    },
  });
}
