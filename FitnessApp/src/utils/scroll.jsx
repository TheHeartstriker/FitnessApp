export function ScrollDown({ percent, className, children }) {
  function scrollDown(targetPercent) {
    const scrollPosition =
      (targetPercent / 100) * document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }

  return (
    <button className={className} onClick={() => scrollDown(percent)}>
      {children}
    </button>
  );
}
