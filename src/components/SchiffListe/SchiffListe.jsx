import React, { Component } from "react";
import Schiff from "../Schiff/Schiff";

import "./SchiffListe.css";

class SchiffListe extends Component {
  render() {
    if (this.props.schiffe.length === 0) {
      return (
        <div className="center">
          <h2>Keine Schiffe gefunden.</h2>
        </div>
      );
    }
    return (
      <ul className="schiff-list">
        {this.props.schiffe.map((schiff) => {
          //return <li key={schiff.id}>{schiff.name}</li>;
          return (
            <Schiff
              key={schiff.id}
              id={schiff.id}
              name={schiff.name}
              image={schiff.image}
              timeseen={schiff.timeseen}
              countseen={schiff.countseen}
            />
          );
        })}
      </ul>
    );
  }
}

export default SchiffListe;
