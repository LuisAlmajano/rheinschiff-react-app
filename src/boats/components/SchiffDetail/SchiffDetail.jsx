import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

const SchiffDetail = (props) => {
  const date = new Date(props.timeseen);

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = useParams().boatId;

  const deleteBoatHandler = (event) => {
  
    axios
      .delete(`http://localhost:3001/api/boats/${boatId}`)
      .catch((error) =>
        console.error("Error trying to delete data with axios: ", error)
      );
  };

  return (
    <li className="schiff-item">
      <Card className="schiff-item__content">
        <div className="schiff-item__image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="schiff-item__info">
          <h2>Name: {props.name}</h2>
          <h2>Description: {props.description}</h2>
          <h4>
            Seen: {props.countseen} {props.countseen === 1 ? "Time" : "Times"}
          </h4>
          <h4>Last seen on: {date.toGMTString()}</h4>
        </div>
        <div className="schiff-item__actions">
          <Button>EDIT</Button>
          <Button className="button button-danger" onClick={deleteBoatHandler}>
            DELETE
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default SchiffDetail;
