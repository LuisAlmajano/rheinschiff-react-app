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

  const editBoatHandler = (event) => {
    console.log("You want to edit boat: ", event);
  };

  const deleteBoatHandler = (event) => {
    axios
      .delete(`http://localhost:3001/api/boats/${boatId}`)
      .then(() => {
        /* Include here Modal logic */
        
        console.log("DELETE Axios Request completed");
      })
      .catch((error) =>
        console.error("Error trying to delete data with axios: ", error)
      );
  };

  return (
    <li className="schiff-item-detail">
      <Card className="schiff-item-detail__content">
        <div className="schiff-item-detail__image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="schiff-item-detail__info">
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <h4>
            Seen: {props.countseen} {props.countseen === 1 ? "Time" : "Times"}
          </h4>
          <h4>Last seen on: {date.toGMTString()}</h4>
        </div>
        <div className="schiff-item-detail__actions">
          <Button onClick={editBoatHandler}>EDIT</Button>
          <Button className="button button-danger" onClick={deleteBoatHandler}>
            DELETE
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default SchiffDetail;
