import { animateLeftRight } from "@/components/animation/regularAni";

export function AnimatedFeatured() {
  const rootStyles = getComputedStyle(document.documentElement);
  const long1 = parseFloat(rootStyles.getPropertyValue("--duration-long-2"));
  const triggers = [];

  // Animate left side cards - image from left, text from right
  const leftCards = document.querySelectorAll(
    ".featured-section-leftside .featured-card",
  );
  leftCards.forEach((card, index) => {
    const image = card.querySelector(".featured-card-image");
    const text = card.querySelector(".featured-card-text");
    if (image) {
      const trigger = animateLeftRight(image, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
    if (text) {
      const trigger = animateLeftRight(text, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
  });

  // Animate right side cards - image from right, text from left
  const rightCards = document.querySelectorAll(
    ".featured-section-rightside .featured-card",
  );
  rightCards.forEach((card, index) => {
    const image = card.querySelector(".featured-card-image");
    const text = card.querySelector(".featured-card-text");
    if (image) {
      const trigger = animateLeftRight(image, long1, 200, 0);
      if (trigger) triggers.push(trigger);
    }
    if (text) {
      const trigger = animateLeftRight(text, long1, 200, 0);
      if (trigger) triggers.push(trigger);
    }
  });

  return () => {
    triggers.forEach((trigger) => trigger.kill());
  };
}
