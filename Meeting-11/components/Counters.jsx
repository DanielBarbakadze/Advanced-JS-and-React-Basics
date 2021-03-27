import React, { Component } from "react";
import Counter from "../components/Counter";

export default class Counters extends Component {
  constructor() {
    super();
    this.state = {
      counters: [
        { id: 1, title: "counter1" },
        { id: 2, title: "counter2" },
        { id: 3, title: "counter3" },
        { id: 4, title: "counter4" },
      ],
    };
    console.log("Counters - Constructor");
  }

  componentDidMount = () => console.log("Counters - componentDidMount");

  componentDidUpdate = () => console.log("Counters - ComponentDidUpdate");

  handleRemove = (id) => {
    this.setState((state) => ({
      counters: state.counters.filter((counter) => counter.id !== id),
    }));
  };

  render() {
    return (
      <div>
        {console.log("Counters - render")}
        <h1>Counters</h1>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            title={counter.title}
            handleRemove={() => this.handleRemove(counter.id)}
          />
        ))}
      </div>
    );
  }
}
