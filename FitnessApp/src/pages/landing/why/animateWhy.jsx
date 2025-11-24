import { animate, onScroll, splitText, stagger } from "animejs";
export function animateWhySection() {
  const { words: Words1 } = splitText(".why-section-header h3", {
    words: { wrap: "clip" },
  });
  const { words: Words2 } = splitText(".why-section-story h4", {
    words: { wrap: "clip" },
  });
  const words = [...Words1, ...Words2];
  const { words: pWords1 } = splitText("#why-p-text-1", {
    words: { wrap: "clip" },
  });
  const { words: pWords2 } = splitText("#why-p-text-2", {
    words: { wrap: "clip" },
  });
  const pWords = [...pWords1, ...pWords2];
  pWords.forEach((word) => {
    word.style.opacity = 0;
  });
  words.forEach((word) => {
    word.style.opacity = 0;
  });

  // Calculate the total duration including stagger
  const staggerDelay = 10;
  const startDelay = 400;
  const wordsDuration = startDelay + pWords1.length * staggerDelay - 700;

  animate(words, {
    autoplay: onScroll({
      leave: "center 300%",
      enter: "center -200%",
      repeat: false,
      onEnterForward: () => {
        //Header text
        animate(words, {
          y: [{ to: ["100%", "0%"] }],
          opacity: [0, 1],
          ease: "out(3)",
          delay: stagger(60),
        });
        //paragraph text 1
        animate(pWords1, {
          y: [{ to: ["100%", "0%"] }],
          opacity: [0, 1],
          ease: "out(3)",
          delay: stagger(staggerDelay, { start: startDelay }),
        });
        //paragraph text 2
        animate(pWords2, {
          y: [{ to: ["100%", "0%"] }],
          opacity: [0, 1],
          ease: "out(3)",
          delay: stagger(staggerDelay, { start: wordsDuration }),
        });
      },
    }),
  });
}
