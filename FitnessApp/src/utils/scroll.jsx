import { useLenis } from "lenis/react";

export function ScrollDown({ percent, className, children }) {
  const lenis = useLenis();

  function scrollDown(targetPercent) {
    if (!lenis) return; // Ensure lenis is available
    const scrollPosition =
      (targetPercent / 100) * document.documentElement.scrollHeight;
    lenis.scrollTo(scrollPosition, {
      duration: 1,
      //Cubic easing
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }

  return (
    <button className={className} onClick={() => scrollDown(percent)}>
      {children}
    </button>
  );
}
