import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import DeleteModal from "../../layout/UIElements/DeleteModal";
import Card from "../../layout/UIElements/Card";
import Button from "react-bootstrap/Button";

//import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

toast.configure();

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
    /* Potentially show here waiting spinner */

    axios
      .delete(`http://localhost:3001/api/boats/${boatId}`)
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
        setShow(false);
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
            Seen: {loadedBoat.countseen}{" "}
            {loadedBoat.countseen === 1 ? "Time" : "Times"}
          </h4>
          <h4>Last seen on: {date.toGMTString()}</h4>
        </div>
        <div className="schiff-item-detail__actions">
          <Button id="edit-button" variant="primary" onClick={editBoatHandler}>
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
};

export default SchiffDetail;
