import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className={`card ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
