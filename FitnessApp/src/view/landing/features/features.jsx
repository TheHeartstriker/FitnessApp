import "./features.css";
import { useEffect, useState } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import ArrowSmRight from "@/../public/icons/arrow-sm-right";
import FeaturesAni from "./featuresAni";
import { para } from "./text";
import { animateSlide, animateNumber } from "./slideAni";
import { card1, card2, card3, card4 } from "./text";
function Features() {
  const [currentContent, setCurrentContent] = useState(card1);
  const [nextContent, setNextContent] = useState(card2);
  const [cardNumber, setCardNumber] = useState(["01", "02", "03", "04"]);
  const [animating, setAnimating] = useState(false);

  function rotateCardNumbers(numbers) {
    return [...numbers.slice(1), numbers[0]];
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
          <p>{para}</p>
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
          <InfoLine text="Features" />
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
          <InfoLine text="Features" />
          <div className="features-section-next-card-text">
            <h3>{nextContent.header}</h3>
            <p>{nextContent.para}</p>
          </div>
        </div>
        <div className="features-section-next-nav">
          <button
            onClick={() => {
              if (animating) return;
              animateNumber(setCardNumber, rotateCardNumbers(cardNumber));
              animateSlide(
                setCurrentContent,
                setNextContent,
                setAnimating,
                cardNumber,
              );
            }}
          >
            <ArrowSmRight />
          </button>
          <span className={` ${cardNumber[0] === "01" ? "active" : ""}`}></span>
          <span className={` ${cardNumber[0] === "02" ? "active" : ""}`}></span>
          <span className={` ${cardNumber[0] === "03" ? "active" : ""}`}></span>
          <span className={` ${cardNumber[0] === "04" ? "active" : ""}`}></span>
        </div>
      </div>
    </section>
  );
}

export default Features;
