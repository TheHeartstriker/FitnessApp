import * as d3 from "d3";

export function drawLineChart(svg, pixelH, pixelW, timeArr, drawData) {
  const reversedTemp = [...timeArr].reverse();
  const maxValue = Math.max(...reversedTemp, 0);
  const padding = 40;

  // Create scales
  const xScale = d3
    .scaleLinear()
    .domain([0, reversedTemp.length - 1])
    .range([padding, pixelW - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([pixelH - padding, padding]);

  // Create line generator
  const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveMonotoneX);

  // Draw the line with transition
  const path = svg.selectAll(".main-line").data([reversedTemp]);

  path
    .enter()
    .append("path")
    .attr("class", "main-line")
    .attr("fill", "none")
    .attr("stroke", "var(--color-3)")
    .attr("stroke-width", 3)
    .attr("d", line)
    .attr("stroke-dasharray", function () {
      const totalLength = this.getTotalLength();
      return totalLength + " " + totalLength;
    })
    .attr("stroke-dashoffset", function () {
      return this.getTotalLength();
    })
    .transition()
    .duration(1500)
    .ease(d3.easeQuadOut)
    .attr("stroke-dashoffset", 0);

  path.transition().duration(800).ease(d3.easeQuadOut).attr("d", line);

  // Background circles with transition
  const bgCircles = svg.selectAll(".dot-gap").data(reversedTemp);

  bgCircles
    .enter()
    .append("circle")
    .attr("class", "dot-gap")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", 0)
    .attr("fill", "var(--color-4)")
    .transition()
    .duration(600)
    .delay((d, i) => i * 50)
    .ease(d3.easeBackOut)
    .attr("r", drawData.background);

  bgCircles
    .transition()
    .duration(600)
    .delay((d, i) => i * 30)
    .ease(d3.easeQuadOut)
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", drawData.background);

  bgCircles.exit().transition().duration(300).attr("r", 0).remove();

  // Solid middle circles with transition
  const solidCircles = svg.selectAll(".dot-inner").data(reversedTemp);

  solidCircles
    .enter()
    .append("circle")
    .attr("class", "dot-inner")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", 0)
    .attr("fill", "var(--color-2)")
    .transition()
    .duration(600)
    .delay((d, i) => i * 50 + 100)
    .ease(d3.easeBackOut)
    .attr("r", drawData.solid);

  solidCircles
    .transition()
    .duration(600)
    .delay((d, i) => i * 30)
    .ease(d3.easeQuadOut)
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", drawData.solid);

  solidCircles.exit().transition().duration(300).attr("r", 0).remove();

  // Outlined circles with transition
  const outlineCircles = svg.selectAll(".dot-outer").data(reversedTemp);

  outlineCircles
    .enter()
    .append("circle")
    .attr("class", "dot-outer")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", 0)
    .attr("fill", "none")
    .attr("stroke", "var(--color-1)")
    .attr("stroke-width", 2)
    .transition()
    .duration(600)
    .delay((d, i) => i * 50 + 200)
    .ease(d3.easeBackOut)
    .attr("r", drawData.outline);

  outlineCircles
    .transition()
    .duration(600)
    .delay((d, i) => i * 30)
    .ease(d3.easeQuadOut)
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", drawData.outline);

  outlineCircles.exit().transition().duration(300).attr("r", 0).remove();
}

export function getCircleSizes(timeProp) {
  // We are considering around a month or two
  if (timeProp > 14 && timeProp < 32) {
    return { background: 0, solid: 5, outline: 0 };
  }
  // We are considering over two months
  if (timeProp > 64) {
    return { background: 0, solid: 0, outline: 0 };
  }

  if (timeProp < 14) {
    return { background: 10, solid: 5, outline: 10 };
  }
}
