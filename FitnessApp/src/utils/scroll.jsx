"use client";
import { useLenis } from "lenis/react";
export function ScrollButton({ percent, className, children, ...props }) {
  const lenis = useLenis();

  function scrollToPercent() {
    if (!lenis) return;

    const vh = window.innerHeight;
    const targetScroll = (percent / 100) * vh;
    lenis.scrollTo(targetScroll, { duration: 1.2 });
  }
  return (
    <button
      className={className ? className : ""}
      onClick={scrollToPercent}
      {...props}
    >
      {children}
    </button>
  );
}
