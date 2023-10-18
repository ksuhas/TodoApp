import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      todoItems: [],
      todoTracker: 0,
      removedtodoTracker: 0
    };
  }

  handleOnChange = (event) => {
    this.setState({
      val: event.target.value
    });
  };

  handleAddToDo = () => {
    if (this.state.val) {
      const addObj = {
        key: Date.now(),
        val: this.state.val,
        isDone: false
      };

      this.setState((state) => ({
        todoItems: [...state.todoItems, addObj],
        todoTracker: state.todoTracker + 1,
        val: ""
      }));
    }
  };

  handleRemoveTodo = (item) => {
    if (item) {
      this.state.todoItems.map((todo) => {
        if (todo.key === item.key) {
          todo.isDone = todo.isDone ? false : true;
        }
      });
      if (item.isDone) {
        this.setState({
          removedtodoTracker: this.state.removedtodoTracker + 1
        });
      } else {
        this.setState({
          removedtodoTracker: this.state.removedtodoTracker - 1
        });
      }
    }
  };

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.val}
          onChange={(event) => this.handleOnChange(event)}
        />
        <button onClick={this.handleAddToDo}>Add</button>
        {this.state.todoTracker ? (
          <p>
            {this.state.todoTracker - this.state.removedtodoTracker} remaing
            items from {this.state.todoTracker}
          </p>
        ) : null}
        <ul>
          {this.state.todoItems.map((item, index) => (
            <li
              className={item.isDone ? "is-done" : ""}
              onClick={() => this.handleRemoveTodo(item)}
              key={item.key}
            >
              {item.val}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;
