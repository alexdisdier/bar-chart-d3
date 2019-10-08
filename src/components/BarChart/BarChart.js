import React, { Component } from "react";
import * as d3 from "d3";

import "./BarChart.css";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const { dataset, id, width: w, height: h } = this.props;

    const barWidth = w / dataset.length;
    const padding = 60;

    /**
     * =======================================
     * BUILD SVG CANVAS
     * where the diagram will be placed.
     */
    const svgWrapper = d3
      .select(`[id=${id}]`)
      .append("svg")
      .attr("width", w + 100)
      .attr("height", h + 60);

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

    const gdpMin = d3.min(dataset, d => d[1]);
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
      .on("mouseover", () =>
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9)
      )
      .on("mouseout", () => console.log("out"))
      .append("title")
      .attr("id", "tooltip")
      .attr("data-date", (d, i) => dataset[i][0]);
  }

  render() {
    return <div id={this.props.id}> </div>;
  }
}

export default BarChart;
