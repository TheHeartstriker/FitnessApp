import "./why.css";
import { useEffect } from "react";
import { animate, splitText, stagger } from "animejs";
function Why() {
  function animateWhySection() {
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

    // Calculate the total duration including stagger
    const staggerDelay = 50;
    const startDelay = 750;
    const wordsDuration = startDelay + words.length * staggerDelay + 500;

    animate(words, {
      y: [{ to: ["100%", "0%"] }],
      opacity: [0, 1],
      ease: "out(3)",
      delay: stagger(staggerDelay, { start: startDelay }),
    });
    // Start pWords animation at the calculated time
    animate(pWords, {
      y: [{ to: ["100%", "0%"] }],
      opacity: [0, 1],
      translateY: [{ from: 30, to: 0 }],
      duration: 1250,
      ease: "out(3)",
      delay: wordsDuration,
    });
  }

  useEffect(() => {
    animateWhySection();
  }, []);

  return (
    <section className="why-section">
      <div className="why-section-header">
        <h3>Why does FGraph's exist?</h3>{" "}
      </div>
      <div className="why-section-story">
        <h4>The story</h4>
        <p id="why-p-text-1">
          This site exists for a variety of reasons. The main one is that I, the
          dev, Kaden Wildauer, want to prove and improve my skill in full-stack
          web development. So I needed something simple to get my hands on, but
          also something I can use to relentlessly improve my skills. Because as
          a human, one of my greatest fears is being average in something that
          is so important to me and that I spend thousands of hours doing. If I
          am, please come roast me at my email: serkadenwildauer@gmail.com.
        </p>
        <p id="why-p-text-2">
          Another large reason is that I enjoy fitness! I am a calisthenics guy.
          But I hate fitness apps usually they are bulky and require too much
          time and effort from me. I just want quick, semi accurate readings on
          my improvement and a look into how much effort I put in. That’s all
          something easy that takes less than 5 minutes a day to track. So I
          made this! Now onto features!
        </p>
      </div>
    </section>
  );
}

export default Why;
