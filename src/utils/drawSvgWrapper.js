import * as d3 from "d3";

const drawSvgWrapper = (id, width, height, margin) =>
  d3
    .select(`[id=${id}]`)
    .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin);

export default drawSvgWrapper;
