import React from "react";
import { Link } from "react-router-dom";

import Schiff from "../Schiff/Schiff";
import Card from "../../../shared/components/UIElements/Card";

import "./SchiffListe.css";

const SchiffListe = (props) => {
  if (props.boats.length === 0) {
    return (
      <div className="center">
        <Card>
          <h3>
            No boats found. Would you like to add a new boat?
          </h3>
          <div>
            <Link to="/boats/new">
              <button type="button" className="btn btn-info">
                Add New Boat
              </button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <ul className="schiff-list">
      {props.boats.map((boat) => {
        return (
          <Schiff
            key={boat._id}
            id={boat._id}
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
