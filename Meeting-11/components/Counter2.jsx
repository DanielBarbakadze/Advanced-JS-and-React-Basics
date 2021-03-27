import React, { Component } from "react";
import "./Counter.scss";

export default class Counters extends Component {
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
        <strong>{this.props.value} </strong>
        <button className="increase" onClick={this.props.handleIncrease}>
          Increase
        </button>
        <button className="decrease" onClick={this.props.handleDecrease}>
          Decrease
        </button>
        <button className="remove" onClick={this.props.handleRemove}>
          Remove
        </button>
      </div>
    );
  }
}
