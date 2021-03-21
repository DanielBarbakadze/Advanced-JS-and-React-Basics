import React from "react";
import TodoItem from "./TodoItem";
import "./Todo.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ["task1", "task2"],
      currentInput: "",
      error: "",
    };
  }

  handleOnInputChange = (e) => {
    this.setState({ currentInput: e.target.value });
  };

  handleOnButtonClick = () => {
    let newTodo = this.state.currentInput;
    let todoArray = [...this.state.todos];

    if (!todoArray.includes(newTodo)) {
      todoArray.push(newTodo);
      this.setState({
        todos: todoArray,
        currentInput: "",
        error: "",
      });
    } else {
      this.setState({ error: "ასეთი ტასკი უკვე არსებობს" });
    }
  };

  render() {
    return (
      <div>
        <div>
          <h1>Input here</h1>
          <input
            placeholder="Input task"
            onChange={this.handleOnInputChange}
            value={this.state.currentInput}
          />
          <button onClick={this.handleOnButtonClick}>
            Add task to todo list
          </button>
          <span style={{ color: "red" }}>{this.state.error}</span>
        </div>

        <div>
          <label>List of tasks:</label>
          <ul>
            {this.state.todos.map((item, idx) => (
              <div>
                <TodoItem key={idx}>{item}</TodoItem>
                <button>Delete task</button>
                <button>Edit task</button>
                <button>Mark as done</button>
                <input placeholder={this.state.todos[idx]} />
                <button>save edited name</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
