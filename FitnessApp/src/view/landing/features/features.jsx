import "./features.css";
import { useEffect, useState } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import FeaturesAni from "./featuresAni";
import { isMobile } from "@/utils/mobile";
import gsap from "gsap";
function Features() {
  const currentContentText = {
    header: "Current Feature",
    para: lorem,
  };
  const nextContentText = {
    header: "Next Feature",
    para: lorem,
  };
  const [currentContent, setCurrentContent] = useState(currentContentText);
  const [nextContent, setNextContent] = useState(nextContentText);
  const [cardNumber, setCardNumber] = useState(["01", "02", "03", "04"]);

  function animateSlide() {
    if (isMobile() || window.innerWidth < 1250) return;
    const currentCard = document.querySelector(".features-section-current");
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
    tl.to(nextCard, {
      x: deltaX,
      opacity: 1,
      duration: 0.8,
      ease: "myBounce",
      backgroundImage: "url('/landing/grid.png')",
    });
    // Reappear the current card at the same height as the next card
    // And reset the next back to its original state
    tl.to(currentCard, {
      opacity: 1,
      duration: 0.0,
      height: `${next90Height}px`,
    });
    tl.to(nextCard, {
      x: "0%",
      opacity: 0,
      duration: 0,
      backgroundImage: "none",
    });
    // Smoothly regrow the now current card
    // Then reappear the next card
    tl.to(currentCard, {
      height: "auto",
      duration: 0.8,
      ease: "myBounce",
    });
    tl.to(nextCard, { x: "0%", opacity: 1, duration: 0.3, ease: "none" });

    // Drive the whole thing with one shared ease over the full duration
    gsap.to(tl, {
      progress: 1,
      duration: tl.duration(),
      ease: "power1.out",
    });
  }

  function animateNumber() {
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
    setCardNumber(["02", "03", "04", "05"]);
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

  return (
    <section className="features-section">
      <FeaturesAni />
      {/*  */}
      {/* Intro / header */}
      {/*  */}
      <div className="features-section-intro">
        {/*  */}
        {/* Intro / header */}
        <div className="features-section-intro-header">
          {/* Nav */}
          <div className="features-section-intro-header-nav">
            <div className="features-section-intro-header-nav-item">
              <h4>{cardNumber[0]}</h4>
            </div>
            <hr />
            <h4>{cardNumber[1]}</h4>
            <h4>{cardNumber[2]}</h4>
            <h4>{cardNumber[3]}</h4>
          </div>
          {/* Para */}
          <p>{lorem}</p>
        </div>
        <h2>
          Features, Direction <br />
          and strengths of <br />
          FGraphs
        </h2>
      </div>
      {/*  */}
      {/* Current card / feature */}
      {/*  */}
      <div className="features-section-current">
        <div className="features-section-current-card">
          <InfoLine text="Some info" />
          <div className="features-section-current-card-text">
            <h3>{currentContent.header}</h3>
            <p>{currentContent.para}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Controler / next card */}
      {/*  */}
      <div className="features-section-next">
        <div className="features-section-next-card">
          <InfoLine text="Some info" />
          <div className="features-section-next-card-text">
            <h3>{nextContent.header}</h3>
            <p>{nextContent.para}</p>
          </div>
        </div>
        <div className="features-section-next-nav">
          <button
            onClick={() => {
              animateSlide();
              animateNumber();
            }}
          >
            <ArrowSmRight />
          </button>
          <span></span>
          <span></span>
          <span></span>
          <button>
            <ArrowSmRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
