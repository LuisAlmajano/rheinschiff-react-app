import React, { Component } from "react";
import "./Avatar.css";

class Avatar extends Component {
  state = {};
  render() {
    return (
      <div
        className={`avatar ${this.props.className}`}
        style={this.props.style}
      >
        <img
          src={this.props.image}
          alt={this.props.alt}
          style={{ width: this.props.width, height: this.props.width }}
        />
      </div>
    );
  }
}

export default Avatar;
