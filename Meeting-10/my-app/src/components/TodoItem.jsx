import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <li>
        <span>{this.props.children}</span>
      </li>
    );
  }
}

export default TodoItem;
