import React, { Component } from "react";
import { Button, Card, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { fetchOldItems, addItem } from "./actions/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
  }

  handelClick = () => {
    if (this.inputBox.current.value !== "") {
      const item = {
        id: this.props.items.length,
        name: this.inputBox.current.value,
        isDone: false
      };
      if (this.props.items.length) {
        this.props.addItem([...this.props.items, item]);
      } else this.props.addItem([item]);
    }
    this.inputBox.current.value = "";
  };
  calculateIsDone = () => {
    let count = 0;
    let dummy = this.props.items;
    console.log(dummy);
    if (dummy) {
      dummy.forEach(item => (item.isDone === false ? count++ : count));
    }
    return count;
  };
  handelDone = item => {
    console.log(this.props.items);
    let bool = item.isDone ? false : true;
    let items = [...this.props.items];
    let newItems = items.map(a =>
      a.id === item.id ? { id: item.id, name: item.name, isDone: bool } : a
    );
    this.props.addItem(newItems);
  };
  handelDelete = id => {
    let items = [...this.props.items];
    const newList = items.filter(a => {
      if (a.id !== id) return a;
    });
    this.props.addItem(newList);
  };

  render() {
    let { items } = this.props.items;
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
            {this.calculateIsDone()} remaining out of {this.props.items.length}{" "}
            tasks
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center"
            }}
          >
            {this.props.items.map(item => (
              <Card
                className="col-3"
                body
                // inverse
                color={item.isDone ? "success" : ""}
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
                  color="danger"
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

const mapStateToProps = state => ({
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { fetchOldItems, addItem }
)(App);
