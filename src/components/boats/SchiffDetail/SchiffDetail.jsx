import React, { Fragment, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import S3 from "react-aws-s3";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";
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
    image: loadedBoat.image,
    description: loadedBoat.description,
    firstseen: loadedBoat.firstseen ? new Date(loadedBoat.firstseen) : new Date(),
    lastseen: loadedBoat.lastseen ? new Date(loadedBoat.lastseen) : new Date(),
    countseen: loadedBoat.countseen,
  });
  const date = new Date(loadedBoat.firstseen);
  const date_last = new Date(loadedBoat.lastseen);
  console.log({ date_last });

  let history = useHistory();

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = useParams().boatId;

  // Show Delete Modal to get user confirmation
  const deleteBoatHandler = (event) => {
    setShowModal(true);
  };

  // Close Delete Modal
  const handleClose = () => setShowModal(false);

  // Deletion of boat after confirming so in Delete Modal
  const confirmDeleteHandler = (event) => {
    /* Potentially show here waiting spinner */

    // Get boat name to retrieve S3 file name
    let S3filename;
    axios
      .get(`/api/boats/${boatId}`)
      .then((result) => {
        S3filename = result.data.name;
        console.log("S3 Filename: ", S3filename);
      })
      .catch((err) =>
        console.error("Error trying to retrieve boat by ID: ", err)
      );

    axios
      .delete(`/api/boats/${boatId}`)
      .then(() => {
        /* TODO Delete image in AWS S3 Bucket */
        // https://www.npmjs.com/package/react-aws-s3
        // AWS S3 Config
        const config = {
          bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
          dirName: process.env.REACT_APP_AWS_DIR_NAME,
          region: process.env.REACT_APP_AWS_REGION,
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
          secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
        };

        // Delete file in AWS S3
        // In order for this to Worker, S3 policies need to be adjusted
        // const ReactS3Client = new S3(config);
        // ReactS3Client.deleteFile(S3filename + '.jpg')
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err))

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

  // Confirm save after editing boat
  const saveEditBoatHandler = (event) => {
    setEditing(false);
    console.log(editedBoat);
    axios
      .put(`/api/boats/${boatId}`, editedBoat)
      .then(() => {
        toast("Boat was edited!", { type: "success" });
      })
      .catch((error) => {
        toast("Ops! Something went wrong", { type: "error" });
        console.error("Error fetching data with axios: ", error);
      });
  };

  if (editing) {
    // Use as reference https://blog.logrocket.com/building-inline-editable-ui-in-react/

    return (
      <Card className="schiff-item-detail__content">
        <div className="schiff-item-detail__image">
          <img src={editedBoat.image} alt={editedBoat.name} />
        </div>
        <div className="schiff-item-detail__info">
          <h2>{editedBoat.name}</h2>
          <textarea
            rows="3"
            value={editedBoat.description}
            onChange={(e) =>
              setEditedBoat({ ...editedBoat, description: e.target.value })
            }
          />
          <h4>
            Seen:{" "}
            <AiFillPlusCircle
              onClick={() =>
                setEditedBoat({
                  ...editedBoat,
                  countseen: editedBoat.countseen + 1,
                })
              }
            />{" "}
            {editedBoat.countseen}{" "}
            <AiFillMinusCircle
              onClick={() =>
                setEditedBoat({
                  ...editedBoat,
                  countseen: editedBoat.countseen - 1,
                })
              }
            />
            {editedBoat.countseen === 1 ? "Time" : "Times"}
          </h4>

          <h4>First seen on:</h4>
          <DatePicker
            selected={editedBoat.firstseen}
            onChange={(date) => {
              setEditedBoat({ ...editedBoat, firstseen: date });
            }}
            withPortal
            value={editedBoat.firstseen}
          />

          <h4>Last seen on:</h4>
          <DatePicker
            selected={editedBoat.lastseen}
            onChange={(date) => {
              setEditedBoat({ ...editedBoat, lastseen: date });
            }}
            withPortal
            value={editedBoat.lastseen}
          />
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
            <img src={editedBoat.image} alt={editedBoat.name} />
          </div>
          <div className="schiff-item-detail__info">
            <h2>{editedBoat.name}</h2>
            <p>{editedBoat.description}</p>
            <h4>
              Seen: {editedBoat.countseen}{" "}
              {editedBoat.countseen === 1 ? "Time" : "Times"}
            </h4>
            <h4>First seen on: {date.toDateString()}</h4>
            {loadedBoat.lastseen && (
              <h4>Last seen on: {date_last.toDateString()}</h4>
            )}
          </div>
          <div className="schiff-item-detail__actions">
            <Button
              id="edit-button"
              variant="primary"
              onClick={() => setEditing(true)}
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
