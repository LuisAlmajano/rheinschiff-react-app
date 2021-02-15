import React from "react";
import { Link } from "react-router-dom";

import Schiff from "../Schiff/Schiff";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";

import "./SchiffListe.css";

const SchiffListe = (props) => {
  if (props.boats.length === 0) {
    return (
      <div className="center">
        <Card className="empty-list">
          <h3>No boats found. Would you like to add a new boat?</h3>
          <div>
            <Link to="/boats/new">
              <Button>Add New Boat</Button>
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
