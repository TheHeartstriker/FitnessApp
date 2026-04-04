import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

//
// Function for animating text by splitting it into characters and animating them in sequence
//
export function animateText(pos, elements, timeline, time, scrollTrigger) {
  //
  // Accept either a single element or an array of elements
  const elementArray = Array.isArray(elements) ? elements : [elements];
  if (!elementArray.length || !elementArray[0]) return;
  //
  //Iterate over each char
  elementArray.forEach((element, index) => {
    if (!element) return;
    const split = new SplitText(element, { type: "words,chars" });
    const letters = split.chars;
    // Set initial state
    gsap.set(letters, { y: pos.start, opacity: 0 });
    // If no subsequentOffset is provided, default to "-=0.4" so each element starts in sequence
    const position =
      index === 0 ? (time.offset ?? "+=0") : (time.subsequentOffset ?? "-=0.4");

    timeline.to(
      letters,
      {
        y: pos.end,
        rotation: 0,
        opacity: 1,
        duration: time.duration,
        ease: time.easing,
        stagger: time.stagger ?? 0.03,
        delay: index === 0 ? (time.delay ?? 0) : 0,
      },
      position,
    );
    //
    // If scroll trigger is provided
    if (scrollTrigger) {
      ScrollTrigger.create({
        trigger: elementArray[0],
        start: scrollTrigger.start,
        end: scrollTrigger.end,
        onEnter: () => timeline.play(),
      });
    }
  });
}
//
// Animation for blocks (e.g., cards, sections sometimes text) with optional scroll trigger
//
export function animateBlocks(pos, aniStart, aniEnd, elements, time, timeline) {
  if (!elements?.length || !time) return;
  //
  // Use provided timeline or create a new shared one
  const sharedTimeline = timeline || gsap.timeline({ paused: true });
  //
  // Set initial state for all elements at once
  gsap.set(elements, { [pos.type || "x"]: pos.start, opacity: 0 });
  //
  // Add all elements to the shared timeline with stagger as a group
  sharedTimeline.to(
    elements,
    {
      [pos.type || "x"]: pos.end,
      opacity: 1,
      duration: time.duration,
      ease: time.easing || "power1.out",
      stagger: time.stagger || 0.03,
      delay: time.delay ?? 0,
    },
    time.offset || "+=0",
  );
  //
  // Single ScrollTrigger on the first element as the trigger anchor
  if (aniStart && aniEnd) {
    ScrollTrigger.create({
      trigger: elements[0],
      start: `${aniStart.el} ${aniStart.scroll}`,
      end: `${aniEnd.el} ${aniEnd.scroll}`,
      onEnter: () => sharedTimeline.play(),
    });
  }
}
