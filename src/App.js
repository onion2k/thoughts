import React, { Component } from "react";
import Bubble from "./Bubble.js";
import Person from "./Person.js";
import "./App.css";

class App extends Component {
  state = {
    box: {}
  };
  updateBubble = this.updateBubble.bind(this);
  updateBubble(box) {
    this.setState({ box: box });
  }
  render() {
    return (
      <div className="App">
        <Bubble box={this.state.box} />
        <Person updateBubble={this.updateBubble} />
      </div>
    );
  }
}

export default App;
