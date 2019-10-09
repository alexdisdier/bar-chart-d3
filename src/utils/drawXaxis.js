const drawXaxis = (svgWrapper, padding, height, xAxis) =>
  svgWrapper
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${padding}, ${height})`)
    .attr("class", "tick")
    .call(xAxis);

export default drawXaxis;
