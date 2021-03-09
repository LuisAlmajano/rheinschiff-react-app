import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from 'prop-types'


import DeleteModal from "../../../shared/components/UIElements/DeleteModal";
import Card from "../../../shared/components/UIElements/Card";
import Button from "react-bootstrap/Button";
//import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

const SchiffDetail = ({ loadedBoat }) => {
  const [show, setShow] = useState(false);
  const date = new Date(loadedBoat.timeseen);
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
          <img src={loadedBoat.image} alt={loadedBoat.name} />
        </div>
        <div className="schiff-item-detail__info">
          <h2>{loadedBoat.name}</h2>
          <p>{loadedBoat.description}</p>
          <h4>
            Seen: {loadedBoat.countseen} {loadedBoat.countseen === 1 ? "Time" : "Times"}
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

SchiffDetail.propTypes = {
  loadedBoat: PropTypes.object.isRequired,
}

export default SchiffDetail;
