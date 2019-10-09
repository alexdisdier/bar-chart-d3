import React, { Component } from "react";
import * as d3 from "d3";

import { drawSvgWrapper } from "utils";

import "./BarChart.css";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const { dataset, id, width: w, height: h, padding, margin } = this.props;

    const barWidth = w / dataset.length;

    /**
     * =======================================
     * BUILD SVG CANVAS
     * where the diagram will be placed.
     */
    const svgWrapper = drawSvgWrapper(id, w, h, margin);

    /**
     * =======================================
     * BUILD THE X-AXIS with labels
     */
    const yearsDate = dataset.map(item => new Date(item[0]));

    const xMax = new Date(d3.max(yearsDate));

    // maxDate.setMonth(maxDate.getMonth() + 3);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(yearsDate), xMax])
      .range([0, w]);

    const xAxis = d3.axisBottom(xScale);

    /**
     * Draw the X axis
     */
    svgWrapper
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${padding}, ${h})`)
      .attr("class", "tick")
      .call(xAxis);

    /**
     * Add Y-axis legend
     */
    svgWrapper
      .append("text")
      .attr("x", w / 2 + 120)
      .attr("y", h + 50)
      .style("font-size", 12)
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf");

    /**
     * =======================================
     * BUILD THE Y-AXIS with labels
     */

    const gdpMax = d3.max(dataset, d => d[1]);

    const yScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([h, 0]);

    const yAxis = d3.axisLeft(yScale);

    /**
     * Draw the Y-axis
     */
    svgWrapper
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .attr("class", "tick")
      .call(yAxis);

    /**
     * Add Y-axis legend
     */
    svgWrapper
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", 80)
      .style("font-size", 12)
      .text("Gross Domestic Product");

    /**
     * =======================================
     * BUILD THE BARS with tooltips
     */

    const tooltip = d3
      .select(`#${id}`)
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    var overlay = d3
      .select(`#${id}`)
      .append("div")
      .attr("class", "overlay")
      .style("opacity", 0);

    svgWrapper
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(yearsDate[i]) + padding)
      .attr("y", d => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", d => h - yScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d, i) => dataset[i][0])
      .attr("data-gdp", (d, i) => dataset[i][1])
      // tooltip
      .on("mouseover", (d, i) => {
        overlay
          .transition()
          .duration(0)
          .style("height", d + "px")
          .style("width", barWidth + "px")
          .style("opacity", 0.9)
          .style("left", i * barWidth + 0 + "px")
          .style("top", h - d + "px")
          .style("transform", "translateX(60px)");
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(
            dataset[i][0] +
              "<br/>" +
              "$" +
              dataset[i][1].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") +
              " Billion"
          )
          .attr("data-date", dataset[i][0])
          .style("left", i * barWidth - padding + "px")
          .style("top", h * 1.3 + "px")
          .style("transform", `translateX(${padding * 4.5}px)`);
      })
      .on("mouseout", () => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
        overlay
          .transition()
          .duration(200)
          .style("opacity", 0);
      });
  }

  render() {
    return (
      <div id={this.props.id}>
        <h1 id="title">United States GDP</h1>
      </div>
    );
  }
}

export default BarChart;
