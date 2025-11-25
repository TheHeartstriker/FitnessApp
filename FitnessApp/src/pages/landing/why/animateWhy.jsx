import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateWhySection() {
  // Split text into words
  const h3Split = new SplitText(".why-section-header h3", { type: "words" });
  const h4Split = new SplitText(".why-section-story h4", { type: "words" });
  const p1Split = new SplitText("#why-p-text-1", { type: "words" });
  const p2Split = new SplitText("#why-p-text-2", { type: "words" });

  const headerWords = [...h3Split.words, ...h4Split.words];
  const pWords1 = p1Split.words;
  const pWords2 = p2Split.words;
  const allWords = [...headerWords, ...pWords1, ...pWords2];

  // Set initial states
  gsap.set(allWords, { y: "100%", opacity: 0 });

  // Create timeline with ScrollTrigger
  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-section",
      start: "top 90%",
      end: "bottom 80%",
      scrub: true,
    },
  });

  // Animate header words
  tl.to(headerWords, {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.06,
  });

  // Animate first paragraph
  tl.to(
    pWords1,
    {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.01,
    },
    "-=0.5"
  );

  // Animate second paragraph
  tl.to(
    pWords2,
    {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.01,
    },
    "-=0.3"
  );

  // Cleanup function
  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    h3Split.revert();
    h4Split.revert();
    p1Split.revert();
    p2Split.revert();
  };
}
