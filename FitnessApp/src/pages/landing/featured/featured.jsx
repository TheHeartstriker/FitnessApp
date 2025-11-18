import "./featured.css";
import Ellipse from "@/assets/landing/ellipse";
import { FeaturedCard } from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { animate, onScroll } from "animejs";
import { useEffect, useRef } from "react";
import { simpleHoverGlow } from "./hoverGlow";

function Featured() {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  const cardRefs = [cardRef1, cardRef2, cardRef3];

  function onScrollAnimation() {
    const leftCards = document.getElementsByClassName("featured-card--left");
    const rightCards = document.getElementsByClassName("featured-card--right");
    Array.from(leftCards).forEach((i) => {
      animate(i, {
        translateX: ["-40%", "-20%"],
        duration: 1500,
        ease: "inOutQuad",
        autoplay: onScroll({
          leave: "center 400%",
          enter: "center -30%",
          onLeaveBackward: () => {
            animate(i, {
              opacity: 0,
              duration: 1500,
              ease: "inOutQuad",
              translateX: "-40%",
            });
          },
          onEnterForward: () => {
            animate(i, {
              opacity: 1,
              duration: 1500,
              ease: "inOutQuad",
              translateX: "-20%",
            });
          },
          debug: true,
        }),
      });
    });
    Array.from(rightCards).forEach((i) => {
      animate(i, {
        duration: 1500,
        ease: "inOutQuad",
        translateX: ["40%", "20%"],
        autoplay: onScroll({
          leave: "center 400%",
          enter: "center -30%",
          onLeaveBackward: () => {
            animate(i, {
              opacity: 0,
              duration: 1500,
              ease: "inOutQuad",
              translateX: "40%",
            });
          },
          onEnterForward: () => {
            animate(i, {
              opacity: 1,
              duration: 1500,
              ease: "inOutQuad",
              translateX: "20%",
            });
          },
          debug: true,
        }),
      });
    });
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
