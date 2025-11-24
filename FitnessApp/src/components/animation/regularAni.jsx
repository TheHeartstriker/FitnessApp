import { animate, onScroll, splitText, stagger } from "animejs";

export function animateLeftRight(className, from, to) {
  animate(className, {
    duration: 1250,

    autoplay: onScroll({
      leave: "center 300%",
      enter: "center -30%",
      onEnterForward: () => {
        animate(className, {
          opacity: [0, 1],
          translateX: [{ from: from, to: to }],
          repeat: false,
        });
      },
      onLeaveBackward: () => {
        animate(className, {
          opacity: 0,
          translateX: from,
          repeat: false,
        });
      },
    }),
  });
}
