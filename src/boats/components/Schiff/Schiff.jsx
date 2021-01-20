import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";
import "./Schiff.css";

const Schiff = (props) => {
  return (
    <li className="schiff-item">
      <Card className="schiff-item__content">
        <Link to={`/boats/${props.id}`}>
          <div className="schiff-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="schiff-item__info">
            <h2>{props.name}</h2>
            <h3>
              Seen: {props.countseen} {props.countseen === 1 ? "Time" : "Times"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default Schiff;
