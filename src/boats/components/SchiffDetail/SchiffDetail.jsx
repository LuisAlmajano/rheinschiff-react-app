import React from "react";

import Card from "../../../shared/components/UIElements/Card";
import "./SchiffDetail.css";

const SchiffDetail = (props) => {
  const date = new Date(props.timeseen);

  return (
    <li className="schiff-item">
      <Card className="schiff-item__content">
        <div className="schiff-item__image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="schiff-item__info">
          <h2>Name: {props.name}</h2>
          <h4>
            Seen: {props.countseen} {props.countseen === 1 ? "Time" : "Times"}
          </h4>
          <h4>Last seen on: {date.toGMTString()}</h4>
        </div>
        <div className="schiff-item__actions">
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default SchiffDetail;
