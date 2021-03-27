import React, { Component } from "react";
import Counter2 from "../components/Counter2";

export default class Counters2 extends Component {
  constructor() {
    super();
    this.state = {
      counters: [
        { id: 1, title: "counter1", value: 0 },
        { id: 2, title: "counter2", value: 0 },
        { id: 3, title: "counter3", value: 0 },
        { id: 4, title: "counter4", value: 0 },
      ],
    };
    console.log("Counters - Constructor");
  }

  componentDidMount = () => console.log("Counters - componentDidMount");

  handleRemove = (id) => {
    this.setState((state) => ({
      counters: state.counters.filter((counter) => counter.id !== id),
    }));
  };

  handleOperation = (id, increase) => {
    this.setState((state) => ({
      counters: state.counters.map((counter) => {
        if (counter.id === id) {
          return { ...counter, value: counter.value + (increase ? 1 : -1) };
        } else {
          return counter;
        }
      }),
    }));
  };

  handleIncrease = (id) => this.handleOperation(id, true);

  handleDecrease = (id) => this.handleOperation(id, false);

  render() {
    return (
      <div>
        {console.log("Counters - render")}
        <h1>Counters</h1>
        {this.state.counters.map((counter) => (
          <Counter2
            key={counter.id}
            title={counter.title}
            handleIncrease={() => this.handleIncrease(counter.id)}
            handleDecrease={() => this.handleDecrease(counter.id)}
            handleRemove={() => this.handleRemove(counter.id)}
            value={counter.value}
          />
        ))}
      </div>
    );
  }
}
