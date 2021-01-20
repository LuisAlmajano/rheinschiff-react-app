import React from "react";
import Schiff from "../Schiff/Schiff";

import Card from "../../../shared/components/UIElements/Card";
import "./SchiffListe.css";

const SchiffListe = (props) => {
  if (props.boats.length === 0) {
    return (
      <div className="center">
        <Card>
          <h3>
            Keine Schiffe gefunden. Möchtest du ein neues Schiff hinterlegen?
          </h3>
          <button>Schiff hinterlegen</button>
        </Card>
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
