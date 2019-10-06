import React, { Component } from "react";
import BarChart from "./components/BarChart/BarChart";

import barData from "./fixtures/barData";

import "./App.css";

class App extends Component {
  state = {
    dataset: barData.data,
    width: 800,
    height: 500,
    id: "title",
    padding: 60
  };

  render() {
    const { dataset, width, height, id, padding } = this.state;
    return (
      <div className="App">
        <BarChart
          dataset={dataset}
          width={width}
          height={height}
          id={id}
          padding={padding}
        />
      </div>
    );
  }
}

export default App;
