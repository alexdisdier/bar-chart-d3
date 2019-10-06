import React, { Component } from "react";
import * as d3 from "d3";

import "./BarChart.css";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const { dataset, padding, id, width: w, height: h } = this.props;
    /**
     * domain(): values ranging from dataSet min. to dataSet max.
     * e.g: 50, 480
     * this method passes information to the scale about the raw data values for the plot.
     *
     * range(): dataSet points along the x axis on the SVG canvas.
     * e.g: 10, 500 (min value needs to be smaller than dataSet min - 50 and max value needs to be bigger than dataSet max - 480)
     * this method gives it information about the actual space on the web page for the visualization.
     *
     * these 2 methods take an array or at least 2 elements as an argument.
     *
     * scale.domain([50, 480])
     * scale.range([10, 500])
     * Or scale.domain([50, 480]).range([10, 500])
     *
     * scale(50) // Returns 10
     * scale(480) // Returns 500
     */

    /**
     * x axis date
     * - oldest date
     * - newest date
     *
     * y axis GDP values
     * - smallest value
     * - biggest value
     */

    const minDate = d3.min(dataset, d => d[0]);
    const maxDate = d3.max(dataset, d => d[0]);

    const minGDP = d3.min(dataset, d => d[1]);
    const maxGDP = d3.max(dataset, d => d[1]);

    const xScale = d3
      .scaleLinear()
      .domain([0, maxDate])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxGDP])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    /**
     * Create the SVG canvas where the diagram will be placed.
     */
    const svg = d3
      .select(`[id=${id}]`)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    /**
     * Draw the Y axis
     */
    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ",0)")
      .attr("class", "tick")
      .call(yAxis);

    /**
     * Draw the X axis
     * Creating the axis using g (for groups)
     */
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .attr("class", "tick")
      .call(xAxis);

    // /**
    //  * Create all the bars
    //  */
    // svg
    //   .selectAll("rect")
    //   .data(dataset)
    //   .enter()
    //   .append("rect")
    //   .attr("x", d => xScale(d[0]))
    //   .attr("y", d => yScale(d[1]))
    //   .attr("width", 3)
    //   .attr("height", 30)
    //   .attr("class", "bar")
    //   .attr("data-date", (d, i) => dataset[i][0])
    //   .attr("data-gdp", (d, i) => dataset[i][1]);

    // /**
    //  * Create all the text
    //  */
    // svg
    //   .selectAll("text")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .text(d => d)
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - 10 * d - 3);
  }

  render() {
    return <div id={this.props.id}> </div>;
  }
}

export default BarChart;
