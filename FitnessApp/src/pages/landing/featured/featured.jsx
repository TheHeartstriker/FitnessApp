import "./featured.css";
import { FeaturedCard } from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { useEffect } from "react";
import { sharingText, analyisText, designText, testLorem } from "./text.js";
import { AnimatedFeatured } from "./animatedFeatured";

function Featured() {
  useEffect(() => {
    const cleanup = AnimatedFeatured();
    return cleanup;
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-section-leftside">
        <FeaturedCard
          headerText="Creative, meaning full and simple features"
          bodyText={testLorem}
          pillClass=""
          sideClass="introduction"
        />
        <FeaturedCard
          imageSrc={landingGraphs}
          imageAlt="Analytics Image"
          headerText="Hopefully Cool data analysis tools"
          bodyText={analyisText}
          pillClass="featured-card-text-pill--second"
          sideClass="right"
          pill={true}
        />
        <FeaturedCard
          imageSrc={designImg}
          imageAlt="Design Image"
          headerText="Custom built design"
          bodyText={designText}
          pillClass="featured-card-text-pill--third"
          sideClass="left"
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
        />
        <FeaturedCard
          headerText="Progressive update's and endless support"
          bodyText={testLorem}
          pillClass=""
          sideClass="big"
          pill={true}
        />
      </div>
    </section>
  );
}

export default Featured;
