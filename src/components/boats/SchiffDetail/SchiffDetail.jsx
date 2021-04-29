import React, { Fragment, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import DeleteModal from "../../layout/UIElements/DeleteModal";
import Card from "../../layout/UIElements/Card";
import Button from "react-bootstrap/Button";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

//import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

toast.configure();

const SchiffDetail = ({ loadedBoat }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedBoat, setEditedBoat] = useState({
    name: loadedBoat.name,
    description: loadedBoat.description,
    countseen: loadedBoat.countseen,
  });
  const date = new Date(loadedBoat.timeseen);
  let history = useHistory();

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = useParams().boatId;

  const handleClose = () => setShowModal(false);

  const editBoatHandler = (event) => {
    setEditing(true);
  };

  const saveEditBoatHandler = (event) => {
    setEditing(false);
    // @ToDo: Save edited boat in backend
  };

  const increaseCountSeen = (e) => {
    setEditedBoat({ ...editedBoat, countseen: editedBoat.countseen + 1 });
  };

  const decreaseCountSeen = (e) => {
    setEditedBoat({ ...editedBoat, countseen: editedBoat.countseen - 1 });
  };

  const deleteBoatHandler = (event) => {
    /* We show the Modal to get user confirmation */
    setShowModal(true);
  };

  const confirmDeleteHandler = (event) => {
    /* Potentially show here waiting spinner */

    axios
      .delete(`/api/boats/${boatId}`)
      .then(() => {
        /* TODO Delete image in AWS S3 Bucket */
        /* https://www.npmjs.com/package/react-aws-s3
        // AWS S3 Config
        const config = {
          bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
          dirName: process.env.REACT_APP_AWS_DIR_NAME,
          region: process.env.REACT_APP_AWS_REGION,
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
          secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
        };

        // Retrieve filename 
        const ReactS3Client = new S3(config);
        ReactS3Client.deleteFile(filename)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    
        

        /* After deletion, we remove the Modal */
        setShowModal(false);
        toast("Boat was successfully deleted", { type: "success" });
        console.log("DELETE Axios Request completed");
        /* Move to Home page */
        /* https://dev.to/projectescape/programmatic-navigation-in-react-3p1l */
        history.push("/");
      })
      .catch((error) => {
        toast("Ops! Something went wrong", { type: "error" });
        console.error("Error trying to delete data with axios: ", error);
      });
  };

  if (editing) {
    return (
      <Card className="schiff-item-detail__content">
        <div className="schiff-item-detail__image">
          <img src={loadedBoat.image} alt={loadedBoat.name} />
        </div>
        <div className="schiff-item-detail__info">
          <h2>{editedBoat.name}</h2>
          <textarea type="text">{editedBoat.description}</textarea>
          <h4>
            Seen: <AiFillPlusCircle onClick={increaseCountSeen} /> {editedBoat.countseen}{" "}
            <AiFillMinusCircle onClick={decreaseCountSeen} />
            {editedBoat.countseen === 1 ? "Time" : "Times"}
          </h4>
          <h4>Last seen on: {date.toGMTString()}</h4>
        </div>
        <div className="schiff-item-detail__actions">
          <Button
            id="save-button"
            variant="primary"
            onClick={saveEditBoatHandler}
          >
            SAVE
          </Button>
          <Button
            id="cancel-edit-button"
            variant="secondary"
            onClick={() => setEditing(false)}
          >
            CANCEL
          </Button>
        </div>
      </Card>
    );
  } else {
    return (
      <Fragment>
        <Card className="schiff-item-detail__content">
          <div className="schiff-item-detail__image">
            <img src={loadedBoat.image} alt={loadedBoat.name} />
          </div>
          <div className="schiff-item-detail__info">
            <h2>{loadedBoat.name}</h2>
            <p>{loadedBoat.description}</p>
            <h4>
              Seen: {loadedBoat.countseen}{" "}
              {loadedBoat.countseen === 1 ? "Time" : "Times"}
            </h4>
            <h4>Last seen on: {date.toGMTString()}</h4>
          </div>
          <div className="schiff-item-detail__actions">
            <Button
              id="edit-button"
              variant="primary"
              onClick={editBoatHandler}
            >
              EDIT
            </Button>
            <Button
              id="delete-button"
              variant="danger"
              onClick={deleteBoatHandler}
            >
              DELETE
            </Button>
          </div>
        </Card>
        <div className="delete-modal">
          <DeleteModal
            show={showModal}
            handleClose={handleClose}
            confirmDeleteHandler={confirmDeleteHandler}
          />
        </div>
      </Fragment>
    );
  }
};

SchiffDetail.propTypes = {
  loadedBoat: PropTypes.object.isRequired,
};

export default SchiffDetail;
