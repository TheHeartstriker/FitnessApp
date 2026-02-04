import { animateLeftRight } from "@/components/animation/regularAni";

export function AnimatedFeatured() {
  const rootStyles = getComputedStyle(document.documentElement);
  const long1 = parseFloat(rootStyles.getPropertyValue("--duration-long-2"));
  const triggers = [];

  // Animate small featured cards
  const smallCards = document.querySelectorAll(".small-featured ");
  smallCards.forEach((card, index) => {
    const image = card.querySelector(".small-featured-image");
    const text = card.querySelector(".small-featured-text");
    if (image) {
      const trigger = animateLeftRight(image, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
    if (text) {
      const trigger = animateLeftRight(text, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
  });

  // Animate medium featured cards
  const mediumCards = document.querySelectorAll(".medium-featured ");
  mediumCards.forEach((card, index) => {
    const image = card.querySelector(".medium-featured-image");
    const text = card.querySelector(".medium-featured-text");
    if (image) {
      const trigger = animateLeftRight(image, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
    if (text) {
      const trigger = animateLeftRight(text, long1, -200, 0);
      if (trigger) triggers.push(trigger);
    }
  });

  // Animate large featured cards
  const largeCards = document.querySelectorAll(".large-featured ");
  largeCards.forEach((card, index) => {
    const image = card.querySelector(".large-featured-image");
    const text = card.querySelector(".large-featured-text");
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
