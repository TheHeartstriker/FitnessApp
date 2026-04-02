import { useEffect, useRef } from "react";
import { darkenColorDistance, rgbToHsl } from "./backgroundHelper";

function TriAngleBackgroundAni({ svgComponent, parent }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const otherPolyRef = useRef([]);
  const parentRef = useRef(null);
  const rafIdRef = useRef(null);
  const instanceIdRef = useRef(Math.random().toString(36).substr(2, 9));

  function mouseMove(e) {
    // store viewport coords so they match getBoundingClientRect() values
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      for (const i of otherPolyRef.current) {
        updateDistances(i);
        darkenColorDistance(i, 1000, [0.7, 0.99], true);
      }
    });
  }
  //Loops and saves the intial distance, color and id of each poly
  function fillPoly() {
    const instanceId = instanceIdRef.current;
    const container = parentRef.current;
    if (!container) return;
    const elements = container.querySelectorAll('[id^="Vector_"]');
    for (const el of elements) {
      const newId = `bg_${instanceId}_${el.id}`;
      el.id = newId;

      let poly = {
        id: newId,
        distanceToMouse: 0,
        color: [0, 0, 0],
        elCenter: new DOMRect(),
      };

      let elXY = el.getBoundingClientRect();
      if (!elXY) continue;
      const centerX = elXY.x + elXY.width / 2;
      const centerY = elXY.y + elXY.height / 2;
      const distance = Math.sqrt(
        (centerX - mouseRef.current.x) ** 2 +
          (centerY - mouseRef.current.y) ** 2,
      );
      poly["distanceToMouse"] = distance;
      let hslColor = rgbToHsl(window.getComputedStyle(el).fill);
      poly["color"] = hslColor ?? [0, 0, 0];
      poly["elCenter"] = elXY;
      otherPolyRef.current.push(poly);
    }
  }

  function updateCenter() {
    for (const i of otherPolyRef.current) {
      let el = document.getElementById(i.id);
      let elXY = el?.getBoundingClientRect();
      if (!elXY) continue;
      i.elCenter = elXY;
    }
  }

  //updates distance to mouse
  function updateDistances(i) {
    let elXY = i.elCenter;
    if (!elXY) return;
    const centerX = elXY.x + elXY.width / 2;
    const centerY = elXY.y + elXY.height / 2;
    const distance = Math.sqrt(
      (centerX - mouseRef.current.x) ** 2 + (centerY - mouseRef.current.y) ** 2,
    );
    i.distanceToMouse = distance;
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (otherPolyRef.current.length > 0) return;
    parentRef.current = document.querySelector(`${parent}`);
    fillPoly();
  }, []);

  return <>{svgComponent}</>;
}

export default TriAngleBackgroundAni;
