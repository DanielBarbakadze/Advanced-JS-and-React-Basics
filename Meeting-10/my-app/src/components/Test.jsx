import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  handleOnClick = () => {
    // this.setState({ value: this.state.value + 1 });
    // this.setState({ value: this.state.value + 1 });
    // this.setState({ value: this.state.value + 1 });

    this.setState((state, props) => ({
      value: state.value + 1,
    }));

    this.setState((state, props) => ({
      value: state.value + 1,
    }));

    this.setState((state, props) => ({
      value: state.value + 1,
    }));
  };
  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>Increase value</button>
        <p>Message:{this.state.value}</p>
      </div>
    );
  }
}
