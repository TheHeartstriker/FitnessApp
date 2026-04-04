import { isMobile } from "@/utils/mobile";
import gsap from "gsap";
import { card1, card2, card3, card4 } from "./text";
const stringNumMap = {
  "01": card1,
  "02": card2,
  "03": card3,
  "04": card4,
};

export function animateSlide(
  setCurrentContent,
  setNextContent,
  setAnimating,
  cardNumber,
) {
  if (isMobile() || window.innerWidth < 1250) return;
  setAnimating(true);
  const currentCard = document.querySelector(".features-section-current-card");
  const nextCard = document.querySelector(".features-section-next-card");
  const next90Height = nextCard.offsetHeight;
  const currentRect = currentCard.getBoundingClientRect();
  const nextRect = nextCard.getBoundingClientRect();
  const deltaX = currentRect.left - nextRect.left;

  // Build the timeline paused, all children use ease: "none"
  const tl = gsap.timeline({ paused: true });
  //
  // Disapear current card and move next card
  tl.to(currentCard, { opacity: 0, duration: 0.3, ease: "none" });
  tl.call(() => {
    setCurrentContent(stringNumMap[cardNumber[1]]);
  });

  tl.to(nextCard, {
    x: deltaX,
    opacity: 1,
    duration: 0.8,
    ease: "myBounce",
    backgroundImage: `linear-gradient(var(--img-opacity-medium), var(--img-opacity-medium)), url(${stringNumMap[cardNumber[1]].imgSrc})`,
  });
  // Reappear the current card at the same height as the next card
  // And reset the next back to its original state
  tl.to(currentCard, {
    opacity: 1,
    duration: 0.0,
    height: `${next90Height}px`,
    backgroundImage: `linear-gradient(var(--img-opacity-medium), var(--img-opacity-medium)), url(${stringNumMap[cardNumber[1]].imgSrc})`,
  });
  tl.to(nextCard, {
    x: "0%",
    opacity: 0,
    duration: 0,
    backgroundImage: "none",
  });
  tl.call(() => {
    setNextContent(stringNumMap[cardNumber[2]]);
  });
  // Smoothly regrow the now current card
  // Then reappear the next card
  tl.to(currentCard, {
    height: "100%",
    duration: 0.8,
    ease: "myBounce",
  });
  tl.to(nextCard, { x: "0%", opacity: 1, duration: 0.3, ease: "none" });

  // Drive the whole thing with one shared ease over the full duration
  gsap.to(tl, {
    progress: 1,
    duration: tl.duration(),
    ease: "power1.out",
    onComplete: () => setAnimating(false),
  });
}

export function animateNumber(setter, numbers) {
  const currentNumber = document.querySelector(
    ".features-section-intro-header-nav-item h4",
  );
  const nextNumbers = document.querySelectorAll(
    ".features-section-intro-header-nav h4",
  );
  const tl = gsap.timeline({ paused: true });
  //Fade out old numbers
  tl.to([currentNumber, nextNumbers], {
    opacity: 0,
    duration: 0.2,
    ease: "none",
  });
  setter(numbers);
  //Fade in new numbers
  tl.to([currentNumber, nextNumbers], {
    opacity: 1,
    duration: 0.2,
    ease: "none",
  });
  gsap.to(tl, {
    progress: 1,
    duration: tl.duration(),
    ease: "power2.out",
  });
}
