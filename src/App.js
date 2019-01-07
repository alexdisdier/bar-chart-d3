import React, { Component } from 'react';
import './App.css';

import BarChart from './components/BarChart/BarChart';

class App extends Component {

  state = {
    // data: [12, 5, 6, 6, 9, 10],
    dataset: [
      [ 34,     78 ],
      [ 109,   280 ],
      [ 310,   120 ],
      [ 79,   411 ],
      [ 420,   220 ],
      [ 233,   145 ],
      [ 333,   96 ],
      [ 222,    333 ],
      [ 78,    320 ],
      [ 21,   123 ]
    ],
    width: 500,
    height: 500,
    id: 'title',
    padding: 60
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
           <BarChart 
            dataset={this.state.dataset} 
            width={this.state.width} 
            height={this.state.height} 
            id={this.state.id}
            padding={this.state.padding}
            />
        </header>
      </div>
    );
  }
}

export default App;
