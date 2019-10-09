import * as d3 from "d3";

const drawXScale = (xMin, xMax, width) =>
  d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, width]);

export default drawXScale;
