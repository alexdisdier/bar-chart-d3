import React, { Component } from 'react';
import * as d3 from "d3";

import './BarChart.css';

class BarChart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const dataset = this.props.dataset;
    const padding = this.props.padding;

    const w = this.props.width;
    const h = this.props.height;

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[0])])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select('[id="' + this.props.id + '"]')
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // svg.selectAll("rect")
    //   .data(dataset)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - 10 * d)
    //   .attr("width", 65)
    //   .attr("height", (d, i) => d * 10)
    //   .attr("fill", "green")

    // svg.selectAll("text")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .text((d) => d)
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - (10 * d) - 3)

    svg.append("g")
      .attr('id', 'x-axis')
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr('id', 'y-axis')
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

  }

  render() {
    return <div id = {
      this.props.id
    } > </div>
  }
}

export default BarChart;