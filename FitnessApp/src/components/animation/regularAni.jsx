import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const rootStyles = getComputedStyle(document.documentElement);
const normal3 = parseFloat(rootStyles.getPropertyValue("--duration-normal-3"));
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
          duration: normal3,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(element, {
          opacity: 0,
          x: from,
          duration: normal3,
          ease: "power2.out",
        });
      },
    },
  });
}
