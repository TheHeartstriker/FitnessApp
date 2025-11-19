import "./featured.css";
import Ellipse from "@/assets/landing/ellipse";
import { FeaturedCard } from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { useEffect, useRef } from "react";
import { simpleHoverGlow, animateCard } from "./cardEffects";

function Featured() {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRefs = [cardRef1, cardRef2, cardRef3];
  function onScrollAnimation() {
    const leftCards = document.getElementsByClassName("featured-card--left");
    const rightCards = document.getElementsByClassName("featured-card--right");
    animateCard(leftCards[0], "left");
    animateCard(rightCards[0], "right");
    animateCard(leftCards[1], "left");
  }

  useEffect(() => {
    onScrollAnimation();
  }, []);

  return (
    <section
      className="featured-section"
      onMouseMove={(e) => simpleHoverGlow(e, cardRefs)}
    >
      <Ellipse />
      {/* Card one share */}

      <FeaturedCard
        imageSrc={connectionImg}
        imageAlt="Sharing Image"
        headerText="Integrated data sharing system"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass=""
        sideClass="left"
        ref={cardRef1}
      />
      {/* Card two data analysis */}

      <FeaturedCard
        imageSrc={landingGraphs}
        imageAlt="Analytics Image"
        headerText="Advanced data analysis tools"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass="featured-card-text-pill--second"
        sideClass="right"
        ref={cardRef2}
      />
      {/* Card three design tools */}
      <FeaturedCard
        imageSrc={designImg}
        imageAlt="Design Image"
        headerText="Customizable design tools"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass="featured-card-text-pill--third"
        sideClass="left"
        ref={cardRef3}
      />
    </section>
  );
}

export default Featured;
