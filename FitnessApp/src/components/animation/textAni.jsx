import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const rootStyles = getComputedStyle(document.documentElement);
const long2 = parseFloat(rootStyles.getPropertyValue("--duration-long-1"));
gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateText(startPos, endPos, wordClass) {
  const letters = new SplitText(wordClass, { type: "chars" }).chars;

  gsap.set(letters, {
    x: startPos,
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wordClass,
      start: "top 80%",
      end: "bottom 70%",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
      markers: false,
    },
  });

  tl.to(letters, {
    x: endPos,
    opacity: 1,
    duration: long2,
    ease: "power3.out",
    stagger: 0.03,
  });
}
