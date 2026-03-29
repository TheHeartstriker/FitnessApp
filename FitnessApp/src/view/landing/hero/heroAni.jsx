import { gsap } from "gsap/gsap-core";
import { MotionPathPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { animateText, animateBlocks } from "@/utils/animations";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
//
//Animation durations
//
const OPENING_DURATION = 1;
const TEXT_DURATION = 0.6;
const SLIDE_DURATION = 0.4;

function HeroAni() {
  //
  // References
  //
  const svgRef = useRef(null);
  const reductionFactor = 0.02;
  const reductionHW = {
    width: 1 - reductionFactor,
    height: 1 - reductionFactor * 1.833,
  };
  //
  // Opening animation
  //
  function openingAnimation(tl, svgBackground, fullWidth, fullHeight) {
    gsap.set(svgBackground, { opacity: 1 });
    tl.fromTo(
      svgBackground,
      { width: 0, height: 0, borderRadius: "500px" },
      {
        width: `${fullWidth * reductionHW.width}px`,
        height: `${fullHeight * reductionHW.height}px`,
        borderRadius: "40px",
        duration: OPENING_DURATION,
        ease: "power2.out",
        onStart: () => {
          document.body.style.position = "fixed";
        },
        onComplete: () => {
          document.body.style.position = "static";
        },
      },
    );
  }
  //
  // Scroll animation
  //
  function scrollAnimation(tl, svgBackground, fullWidth, fullHeight) {
    tl.fromTo(
      svgBackground,
      {
        width: `${fullWidth * reductionHW.width}px`,
        height: `${fullHeight * reductionHW.height}px`,
      },
      {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "75px top",
          scrub: true,
        },
        width: `100%`,
        height: `100%`,
        ease: "none",
      },
    );
  }
  //
  // Text animation
  //
  function textAnimation(tl) {
    const header = document.querySelector(".landing-section-content h1");
    const subHeader = document.querySelector(".landing-section-content h2");
    animateText({ start: -75, end: 0 }, [header, subHeader], tl, {
      duration: TEXT_DURATION,
      easing: "myBounce",
    });
  }
  //
  // Slide in animations
  //
  function blockAnimations(tl) {
    const para = document.querySelector(".landing-section-content p");
    const button1 = document.querySelector(
      ".landing-section-content-details-button-1",
    );
    const seperator = document.querySelector(
      ".landing-section-content-details hr",
    );
    const button2 = document.querySelector(
      ".landing-section-content-details-button-2",
    );
    const sepinfo = document.querySelectorAll(
      ".landing-section-content-details h3",
    );
    const arr = [para, button1, seperator, button2, sepinfo];
    animateBlocks(
      { start: -50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      arr,
      {
        duration: SLIDE_DURATION,
        delay: 0,
        stagger: 0.06,
        easing: "myBounce",
      },
      tl,
    );
  }
  useEffect(() => {
    svgRef.current = document.querySelector(".landing-section-svg");
    if (!svgRef.current) return;

    const parent = svgRef.current.parentElement;
    const fullWidth = parent.offsetWidth;
    const fullHeight = parent.offsetHeight;

    const tl = gsap.timeline();

    openingAnimation(tl, svgRef.current, fullWidth, fullHeight);
    scrollAnimation(tl, svgRef.current, fullWidth, fullHeight);
    textAnimation(tl);
    blockAnimations(tl);
  }, []);
}

export default HeroAni;
