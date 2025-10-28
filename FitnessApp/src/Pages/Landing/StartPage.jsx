import { useEffect, useRef } from "react";
import Tribackground from "../../assets/triBackground";

function darkenColorDistance(
  i,
  distanceMax = 1000,
  intensity = [0.01, 0.99],
  dark = false
) {
  let el = document.getElementById(i.id);
  if (!el) return;
  let distance = i.distanceToMouse;
  // Normalize distance
  let norm = intensity[0] + intensity[1] * (distance / distanceMax);
  norm = Math.min(norm, 1);
  let lightness;
  if (dark) {
    lightness = Math.round(i.color[2] * norm);
  } else {
    lightness = Math.round(i.color[2] / norm);
  }

  el.style.stroke = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;
  el.style.fill = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;

  el.style.transition = "fill 0.2s linear, stroke 0.2s linear";
}

export function rgbToHsl(rgb) {
  const result = rgb.match(/\d+/g)?.map((num) => parseInt(num, 10));
  if (!result || result.length < 3) return null;
  let [r, g, b] = result;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function TriAngleBackgroundAni() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const otherPolyRef = useRef([]);
  const parentRef = useRef(null);

  function mouseMove(e) {
    if (!parentRef.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;

    for (const i of otherPolyRef.current) {
      updateDistances(i);
      darkenColorDistance(i, 1000, [0.7, 0.99], true);
    }
  }

  //Loops and saves the intial distance, color and id of each poly
  function fillPoly() {
    let amount = 828;
    for (let i = 1; i < amount; i++) {
      let poly = {
        id: "",
        distanceToMouse: 0,
        color: [0, 0, 0],
        elCenter: new DOMRect(),
      };
      let el = document.getElementById(`Vector_${i}`);
      if (!el) continue;
      //id name
      poly["id"] = `Vector_${i}`;
      //distance
      let elXY = el.getBoundingClientRect();
      if (!elXY) continue;
      const centerX = elXY.x + elXY.width / 2;
      const centerY = elXY.y + elXY.height / 2;
      const distance = Math.sqrt(
        (centerX - mouseRef.current.x) ** 2 +
          (centerY - mouseRef.current.y) ** 2
      );
      poly["distanceToMouse"] = distance;
      //saving intial color and change to hsl
      let hslColor = rgbToHsl(window.getComputedStyle(el).fill);
      poly["color"] = hslColor ?? [0, 0, 0];
      //Saving center
      poly["elCenter"] = elXY;
      //push to array
      otherPolyRef.current.push(poly);
    }
  }

  function updateCenter() {
    for (const i of otherPolyRef.current) {
      let elXY = document.getElementById(i.id)?.getBoundingClientRect();
      if (!elXY) return;
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
      (centerX - mouseRef.current.x) ** 2 + (centerY - mouseRef.current.y) ** 2
    );
    i.distanceToMouse = distance;
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", updateCenter);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  useEffect(() => {
    if (otherPolyRef.current.length > 0) return;
    parentRef.current = document.querySelector(".landing-background-svg");
    fillPoly();
    console.log(otherPolyRef.current);
  }, []);

  return (
    <>
      <Tribackground />
    </>
  );
}

export default TriAngleBackgroundAni;
