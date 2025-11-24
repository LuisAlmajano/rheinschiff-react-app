import React, { Fragment, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AWS from "aws-sdk";
import PropTypes from "prop-types";
import { useAuth } from "../../../contexts/AuthContext";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import DeleteModal from "../../layout/UIElements/DeleteModal";
import Card from "../../layout/UIElements/Card";
import Button from "react-bootstrap/Button";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
// AWS Cognito to get temporary credentials
import getAwsCredentials from "../../../utils/cognito";
import { auth } from "../../../utils/firebase";

//import Button from "../../../shared/components/FormElements/Button";
import "./SchiffDetail.css";

toast.configure();

// AWS S3 Client with Cognito temporary credentials
const createS3Client = (firebaseToken) => {
  const credentials = getAwsCredentials(firebaseToken);

  return new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    requestChecksumCalculation: "WHEN_REQUIRED",
    credentials,
  });
};

// AWS S3 Delete Boat Image Function
const deleteBoatImageS3 = async (S3Object) => {
  const firebaseToken = await auth.currentUser.getIdToken(true);
  const s3 = await createS3Client(firebaseToken);

  const command = new DeleteObjectCommand({
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: `${process.env.REACT_APP_AWS_DIR_NAME + "/" + S3Object}`,
  });

  // Send delete command to delete image to S3
  try {
    await s3.send(command);
    // toast("Boat image deleted in S3!", {
    //   type: "success",
    //   autoClose: 1500,
    // });
    console.log("S3 object deleted successfully");
    return true;
  } catch (err) {
    //toast("Ops! S3 image deletion went wrong", { type: "error" });
    console.error("Failed to delete S3 object: " + JSON.stringify(err));
    throw err;
  }
};

const SchiffDetail = ({ loadedBoat }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedBoat, setEditedBoat] = useState({
    name: loadedBoat.name,
    image: loadedBoat.image,
    description: loadedBoat.description,
    firstseen: loadedBoat.firstseen
      ? new Date(loadedBoat.firstseen)
      : new Date(),
    lastseen: loadedBoat.lastseen ? new Date(loadedBoat.lastseen) : new Date(),
    countseen: loadedBoat.countseen,
  });
  const date = new Date(loadedBoat.firstseen);
  const date_last = new Date(loadedBoat.lastseen);
  console.log({ date_last });

  const { currentUser } = useAuth();

  let history = useHistory();

  // Set locale for DatePicker (so that week starts on Monday)
  registerLocale("en", enGB);
  setDefaultLocale("en");

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = useParams().boatId;

  // Show Delete Modal to get user confirmation
  const deleteBoatHandler = (event) => {
    setShowModal(true);
  };

  // Close Delete Modal
  const handleClose = () => setShowModal(false);

  // Function to delete boat from S3
  // https://stackoverflow.com/questions/27753411/how-do-i-delete-an-object-on-aws-s3-using-javascript

  // const deleteS3Object = async (S3Object) => {
  //   AWS.config.update({
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  //     secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
  //     region: process.env.REACT_APP_AWS_REGION,
  //   });
  //   const s3 = new AWS.S3();

  //   const params = {
  //     Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
  //     Key: `${process.env.REACT_APP_AWS_DIR_NAME + "/" + S3Object}`, //if any sub folder-> path/of/the/folder.ext
  //   };
  //   try {
  //     await s3.headObject(params).promise();
  //     console.log(`File ${S3Object} found in S3`);
  //     try {
  //       await s3.deleteObject(params).promise();
  //       console.log(`DELETE File ${S3Object} in S3 successfully!!`);
  //     } catch (err) {
  //       console.error("ERROR in file Deleting : " + JSON.stringify(err));
  //     }
  //   } catch (err) {
  //     console.error("File not Found ERROR : " + err.code);
  //   }
  // };

  // Deletion of boat after confirming so in Delete Modal
  const confirmDeleteHandler = (event) => {
    /* Potentially show here waiting spinner */

    // Get boat name to retrieve S3 file name
    let S3filename;

    axios
      .get(`/api/boats/${boatId}`)
      .then((result) => {
        S3filename = result.data.name + "." + result.data.image.split(".")[5]; // S3filename includes filename + file extension
        console.log("S3 Filename: ", S3filename);
      })
      .catch((err) =>
        console.error("Error trying to retrieve boat by ID: ", err)
      );

    axios
      .delete(`/api/boats/${boatId}`)
      .then(() => {
        /* Delete image in AWS S3 Bucket */
        deleteBoatImageS3(S3filename);
        //deleteS3Object(S3filename);

        /* After deletion, we remove the Modal */
        setShowModal(false);
        toast("Boat was successfully deleted", {
          type: "success",
          autoClose: 1500,
        });
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
        toast("Boat was edited!", { type: "success", autoClose: 1500 });
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
            showIcon
            selected={editedBoat.firstseen}
            onChange={(date) => {
              setEditedBoat({ ...editedBoat, firstseen: date });
            }}
            withPortal
            isClearable
            value={editedBoat.firstseen}
          />

          <h4>Last seen on:</h4>
          <DatePicker
            showIcon
            selected={editedBoat.lastseen}
            onChange={(date) => {
              setEditedBoat({ ...editedBoat, lastseen: date });
            }}
            withPortal
            isClearable
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
            {loadedBoat.lastseen &&
              loadedBoat.lastseen !== loadedBoat.firstseen && (
                <h4>Last seen on: {date_last.toDateString()}</h4>
              )}
          </div>
          <div className="schiff-item-detail__actions">
            <Button
              id="edit-button"
              variant="primary"
              onClick={() => setEditing(true)}
              disabled={currentUser ? false : true}
            >
              EDIT
            </Button>
            <Button
              id="delete-button"
              variant="danger"
              onClick={deleteBoatHandler}
              disabled={currentUser ? false : true}
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
