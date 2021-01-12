import React, { Component } from "react";

import "./SchiffListe.css";

class SchiffListe extends Component {
  render() {
    return (
      <ul className="schiff-liste">
        {this.props.schiffe.map((schiff) => {
          return <li key={schiff.id}>{schiff.name}</li>;
        })}
      </ul>
    );
  }
}

export default SchiffListe;
