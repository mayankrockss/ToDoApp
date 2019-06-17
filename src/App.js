import React, { Component } from "react";
import { Button, Card, CardTitle } from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
  }
  state = {
    items: []
  };

  handelClick = () => {
    if (this.inputBox.current.value !== "") {
      const item = {
        id: this.state.items.length,
        name: this.inputBox.current.value,
        isDone: false
      };
      if (this.state.items.length) {
        this.setState({ items: [...this.state.items, item] });
      } else this.setState({ items: [item] });
    }
    this.inputBox.current.value = "";
  };
  calculateIsDone = () => {
    let count = 0;
    this.state.items.forEach(item => (item.isDone === false ? count++ : count));
    return count;
  };
  handelDone = item => {
    let bool = item.isDone ? false : true;
    let items = [...this.state.items];
    let newItems = items.map(a =>
      a.id === item.id ? { id: item.id, name: item.name, isDone: bool } : a
    );
    this.setState({ items: newItems });
  };
  handelDelete = id => {
    let items = [...this.state.items];
    const newList = items.filter(a => {
      if (a.id !== id) return a;
    });
    this.setState({ items: newList });
  };

  render() {
    return (
      <>
        <div className="container form-group">
          <h2>Todo List</h2>
          <div style={{ display: "flex" }}>
            <input
              className="form-control form-control-lg col-6"
              ref={this.inputBox}
              type="text"
            />
            <Button
              style={{ marginBottom: "10px" }}
              size="lg"
              color="primary"
              onClick={this.handelClick}
            >
              Add
            </Button>
          </div>
          <div>
            {this.calculateIsDone()} remaining out of {this.state.items.length}{" "}
            tasks
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center"
            }}
          >
            {this.state.items.map(item => (
              <Card
                className="col-3"
                body
                inverse
                color={item.isDone ? "success" : "info"}
                key={item.id}
              >
                <CardTitle
                  className={item.isDone ? "is-done" : ""}
                  onClick={() => this.handelDone(item)}
                >
                  {item.name}
                </CardTitle>
                <Button
                  onClick={() => this.handelDelete(item.id)}
                  color="primary"
                >
                  Delete
                </Button>
              </Card>
            ))}
          </div>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                    .col-3,.col-6{
                      margin-right:5px;
                      margin-bottom:10px;
                    }
                `}</style>
      </>
    );
  }
}
