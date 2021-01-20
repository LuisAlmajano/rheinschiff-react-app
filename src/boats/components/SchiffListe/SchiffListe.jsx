import React from "react";
import Schiff from "../Schiff/Schiff";

import "./SchiffListe.css";

const SchiffListe = (props) => {
  if (props.boats.length === 0) {
    return (
      <div className="center">
        <h2>Keine Schiffe gefunden.</h2>
      </div>
    );
  }
  return (
    <ul className="schiff-list">
      {props.boats.map((boat) => {
        return (
          <Schiff
            key={boat.id}
            id={boat.id}
            name={boat.name}
            image={boat.image}
            timeseen={boat.timeseen}
            countseen={boat.countseen}
          />
        );
      })}
    </ul>
  );
};

export default SchiffListe;
