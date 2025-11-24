import { animate, onScroll, splitText, stagger } from "animejs";

export function animateText(textClass) {
  animate(textClass, {
    autoplay: onScroll({
      leave: "center 300%",
      enter: "center -200%",
      onEnterForward: () => {
        //Header text
        animate(textClass, {
          y: [{ to: ["100%", "0%"] }],
          opacity: [0, 1],
          ease: "out(3)",
          delay: stagger(60),
        });
      },
      onLeaveBackward: () => {
        animate(textClass, {
          y: [{ to: ["0%", "100%"] }],
          opacity: [1, 0],
          ease: "in(3)",
          delay: stagger(60),
        });
      },
    }),
  });
}
