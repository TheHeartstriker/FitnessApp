import "./featured.css";
import Ellipse from "@/assets/landing/ellipse";
import { FeaturedCard } from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { animate, onScroll } from "animejs";
import { useEffect } from "react";

function Featured() {
  function onScrollAnimation() {
    const id1 = document.getElementById("first-card");
    animate(id1, {
      duration: 2000,
      ease: "inOutQuad",
      translateX: ["-40%", "-20%"],
      opacity: 1,
      autoplay: onScroll({
        // 80% from the top of the container, -50px from the top of the target
        enter: "40% 20%",
        // 50px from the top of the container, 100px from the top of the target
        leave: "50 -25",
        debug: true,
      }),
    });
  }

  useEffect(() => {
    onScrollAnimation();
  }, []);

  return (
    <section className="featured-section">
      <Ellipse />
      {/* Card one share */}

      <FeaturedCard
        imageSrc={connectionImg}
        imageAlt="Sharing Image"
        headerText="Integrated data sharing system"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass=""
        sideClass="left"
        id="first-card"
      />
      {/* Card two data analysis */}

      <FeaturedCard
        imageSrc={landingGraphs}
        imageAlt="Analytics Image"
        headerText="Advanced data analysis tools"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass="featured-card-text-pill--second"
        sideClass="right"
      />
      {/* Card three design tools */}
      <FeaturedCard
        imageSrc={designImg}
        imageAlt="Design Image"
        headerText="Customizable design tools"
        bodyText="Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi."
        pillClass="featured-card-text-pill--third"
        sideClass="left"
      />
    </section>
  );
}

export default Featured;
