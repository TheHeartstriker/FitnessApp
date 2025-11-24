import "./why.css";
import { useEffect } from "react";
import { animateWhySection } from "./animateWhy";
function Why() {
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
