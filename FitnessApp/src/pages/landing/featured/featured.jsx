import "./featured.css";
import Ellipse from "@/assets/landing/ellipse";
import { FeaturedCard } from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { useEffect, useRef } from "react";
import { simpleHoverGlow, animateCard } from "./cardEffects";
import { sharingText, analyisText, designText, testLorem } from "./text.js";

function Featured() {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRefs = [cardRef1, cardRef2, cardRef3];
  const prevWindowWidth = useRef(window.innerWidth);
  // function onScrollAnimation() {
  //   let from, to;
  //   if (window.innerWidth < 1300) {
  //     from = "20%";
  //     to = "0%";
  //   } else {
  //     from = "40%";
  //     to = "17.5%";
  //   }
  //   const leftCards = document.getElementsByClassName("featured-card--left");
  //   const rightCards = document.getElementsByClassName("featured-card--right");
  //   animateCard(leftCards[0], "left", from, to);
  //   animateCard(rightCards[0], "right", from, to);
  //   animateCard(leftCards[1], "left", from, to);
  // }

  // useEffect(() => {
  //   onScrollAnimation();
  // }, []);

  // useEffect(() => {
  //   function handleResize() {
  //     const currentWidth = window.innerWidth;
  //     const prevWidth = prevWindowWidth.current;
  //     if (
  //       (prevWidth < 1000 && currentWidth >= 1000) ||
  //       (prevWidth >= 1000 && currentWidth < 1000)
  //     ) {
  //       onScrollAnimation();
  //     }
  //     prevWindowWidth.current = currentWidth;
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <section
      className="featured-section"
      onMouseMove={(e) => simpleHoverGlow(e, cardRefs)}
    >
      <div className="featured-section-leftside">
        <FeaturedCard
          headerText="Creative, meaning full and simple features"
          bodyText={testLorem}
          pillClass=""
          sideClass="introduction"
          ref={cardRef1}
        />
        <FeaturedCard
          imageSrc={landingGraphs}
          imageAlt="Analytics Image"
          headerText="Hopefully Cool data analysis tools"
          bodyText={analyisText}
          pillClass="featured-card-text-pill--second"
          sideClass="right"
          ref={cardRef2}
          pill={true}
        />
        <FeaturedCard
          imageSrc={designImg}
          imageAlt="Design Image"
          headerText="Custom built design"
          bodyText={designText}
          pillClass="featured-card-text-pill--third"
          sideClass="left"
          ref={cardRef3}
          pill={true}
        />
      </div>
      <div className="featured-section-rightside">
        <FeaturedCard
          imageSrc={connectionImg}
          imageAlt="Sharing Image"
          headerText="Integrated yet data sharing system"
          bodyText={sharingText}
          pillClass=""
          sideClass="big"
          ref={cardRef1}
        />
        <FeaturedCard
          headerText="Progressive update's and endless support"
          bodyText={testLorem}
          pillClass=""
          sideClass="big"
          ref={cardRef1}
          pill={true}
        />
      </div>
      {/* Card two data analysis */}
    </section>
  );
}

export default Featured;
