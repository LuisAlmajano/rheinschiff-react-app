import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchField.css";

class SearchField extends Component {
  state = {
    enteredText: "",
  };

  textChangeHandler = (event) => {
    const enteredText = event.target.value;
    this.setState({ enteredText });
    console.log("Text entered: " + enteredText);
  };

  addBoatHandler = (props) => {
    console.log("Triggered addboathandler");
    const NewBoat = {
      id: Math.random.toString,
      name: this.state.enteredText,
      timeseen: Date.now(),
      countseen: 1,
    };
    this.props.onNewBoat(NewBoat);
  };

  render() {
    return (
      <div className="Search">
        <span className="SearchSpan">
          <FaSearch onClick={this.addBoatHandler} />
        </span>
        <input
          className="SearchInput"
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.textChangeHandler}
        />
      </div>
    );
  }
}

export default SearchField;
