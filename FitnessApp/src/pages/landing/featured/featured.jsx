import "./featured.css";
import {
  SmallFeatured,
  LargeFeatured,
} from "@/components/landing/featuredCard";
import connectionImg from "@/assets/landing/connection.png";
import landingGraphs from "@/assets/landing/graphs.png";
import designImg from "@/assets/landing/design.png";
import { useEffect } from "react";
import {
  sharingText,
  analyisText,
  textCopy,
  creativeText,
  supportText,
} from "./text.js";
import { AnimatedFeatured } from "./animatedFeatured";

function Featured() {
  useEffect(() => {
    const cleanup = AnimatedFeatured();
    return cleanup;
  }, []);

  return (
    <section className="featured-section">
      <div className="medium-featured">
        <span></span>
        <span></span>
        <span></span>
        <div className="medium-featured-text">
          <h4>Creative, and experimental design</h4>
          <p>{creativeText}</p>
        </div>
      </div>
      <SmallFeatured
        title="Hopefully Cool data analysis tools"
        description={analyisText}
        imageSrc={landingGraphs}
        imageAlt="Graphs Image"
        pillClass="text-pill--second"
      />
      <SmallFeatured
        title="Text copy"
        description={textCopy}
        imageSrc={designImg}
        imageAlt="Design Image"
      />
      <LargeFeatured
        title="Integrated yet data sharing system"
        description={sharingText}
        imageSrc={connectionImg}
        imageAlt="Sharing Image"
      />
      <LargeFeatured
        title="Progressive update's and endless support"
        description={supportText}
        textPill={true}
        pillClass="text-pill--third"
      />
    </section>
  );
}

export default Featured;
