import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import DeleteModal from "../../../shared/components/UIElements/DeleteModal";
import Card from "../../../shared/components/UIElements/Card";
import Button from "react-bootstrap/Button";
//import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

const SchiffDetail = (props) => {
  const [show, setShow] = useState(false);
  const date = new Date(props.timeseen);
  let history = useHistory();

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = useParams().boatId;

  const handleClose = () => setShow(false);

  const editBoatHandler = (event) => {
    console.log("You want to edit boat: ", event);
  };

  const deleteBoatHandler = (event) => {
    /* We show the Modal to get user confirmation */
    setShow(true);
  };

  const confirmDeleteHandler = (event) => {
    axios
      .delete(`http://localhost:3001/api/boats/${boatId}`)
      .then(() => {
        /* Potentially show here waiting spinner */
        console.log("DELETE Axios Request completed");
      })
      .catch((error) =>
        console.error("Error trying to delete data with axios: ", error)
      );
    /* After deletion, we remove the Modal */
    setShow(false);
    /* Move to Home page */
    /* https://dev.to/projectescape/programmatic-navigation-in-react-3p1l */
    history.push("/");
    
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
          <Button id="edit-button" variant="primary" onClick={editBoatHandler}>EDIT</Button>
          <Button id="delete-button" variant="danger" onClick={deleteBoatHandler}>
            DELETE
          </Button>
        </div>
      </Card>
      <div className="delete-modal">
        <DeleteModal
          show={show}
          handleClose={handleClose}
          confirmDeleteHandler={confirmDeleteHandler}
        />
      </div>
    </li>
  );
};

export default SchiffDetail;
