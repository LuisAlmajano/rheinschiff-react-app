import React, { Component } from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./Schiff.css";

class Schiff extends Component {
  state = {};
  render() {
    return (
      <li className="schiff-item">
        <Card className="schiff-item__content">
          <div className="schiff-item__image">
            <Avatar image={this.props.image} alt={this.props.name} />
          </div>
          <div className="schiff-item__info">
            <h2>{this.props.name}</h2>
            <h3>Seen:{" "} 
              {this.props.countseen}{" "}
              {this.props.countseen === 1 ? "Time" : "Times"}
            </h3>
          </div>
        </Card>
      </li>
    );
  }
}

export default Schiff;
