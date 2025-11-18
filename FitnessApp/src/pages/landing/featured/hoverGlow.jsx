import React from "react";

export function simpleHoverGlow(e, cardRefs) {
  for (const i of cardRefs) {
    const card = i.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance from card edges
    const distanceX = Math.max(0, Math.max(-x, x - rect.width));
    const distanceY = Math.max(0, Math.max(-y, y - rect.height));
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Calculate opacity based on distance (fade out over 100px)
    const maxDistance = 100;
    const opacity = Math.max(0, 1 - distance / maxDistance) / 2;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--glow-opacity", opacity.toString());
  }
}
