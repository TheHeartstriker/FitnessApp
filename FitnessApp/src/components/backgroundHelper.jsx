export function darkenColorDistance(
  i,
  distanceMax = 1000,
  intensity = [0.01, 0.99],
  dark = false,
) {
  let el = document.getElementById(i.id);
  if (!el) return;
  let distance = i.distanceToMouse;
  let norm = intensity[0] + intensity[1] * (distance / distanceMax);
  norm = Math.min(norm, 1);
  let lightness;
  if (dark) {
    lightness = Math.round(i.color[2] * norm);
  } else {
    lightness = Math.round(i.color[2] / norm);
  }

  // Use CSS custom properties for better performance
  el.style.cssText = `stroke: hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%); fill: hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%); transition: fill 0.2s linear, stroke 0.2s linear`;
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
