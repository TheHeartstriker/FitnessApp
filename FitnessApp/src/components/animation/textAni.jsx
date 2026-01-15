import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const rootStyles = getComputedStyle(document.documentElement);
const long2 = parseFloat(rootStyles.getPropertyValue("--duration-long-1"));
gsap.registerPlugin(ScrollTrigger);

export function animateText(
  textElements,
  startClass = "80%",
  endClass = "70%"
) {
  textElements.forEach((element, index) => {
    gsap.set(element, {
      y: "100%",
      opacity: 0,
    });

    gsap.to(element, {
      scrollTrigger: {
        trigger: textElements[0],
        start: `top ${startClass}`,
        end: `bottom ${endClass}`,
        onEnter: () => {
          gsap.to(element, {
            y: "0%",
            opacity: 1,
            duration: long2,
            ease: "power3.out",
            delay: index * 0.06,
          });
        },
        onLeaveBack: () => {
          gsap.to(element, {
            y: "100%",
            opacity: 0,
            duration: long2,
            ease: "power3.out",
            delay: index * 0.06,
          });
        },
      },
    });
  });
}
