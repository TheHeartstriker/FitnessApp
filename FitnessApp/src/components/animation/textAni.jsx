import { animate, onScroll, stagger } from "animejs";

export function animateText(textClass) {
  animate(textClass, {
    y: ["100%", "0%"],
    opacity: [0, 1],
    ease: "out(3)",
    delay: stagger(60),
    autoplay: onScroll({
      leave: "center 300%",
      enter: "center -30%",
    }),
  });
}
