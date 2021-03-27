import React, { Component } from "react";
import "./Counter.scss";

export default class Counters extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  handleIncrease = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  handleDecrease = () => {
    this.setState((state) => ({ count: state.count - 1 }));
  };

  componentDidMount = () =>
    console.log(`${this.props.title} - componentDidMount`);

  componentDidUpdate = () =>
    console.log(`${this.props.title} - componentDidUpdate`);

  componentWillUnmount = () =>
    console.log(`${this.props.title} - componentWillUnmount`);

  render() {
    return (
      <div className="counter">
        {console.log(`${this.props.title} - render`)}
        <span>{this.props.title}: </span>
        <strong>{this.state.count} </strong>
        <button className="increase" onClick={this.handleIncrease}>
          {" "}
          Increase
        </button>
        <button className="decrease" onClick={this.handleDecrease}>
          Decrease
        </button>
        <button className="remove" onClick={this.props.handleRemove}>
          Remove
        </button>
      </div>
    );
  }
}
