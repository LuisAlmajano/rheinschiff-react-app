/* Tutorial on formik here: https://www.youtube.com/watch?v=Gcs9cBI2Cw8&list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu&index=12 */
/* https://www.npmjs.com/package/react-datepicker */
/* https://reactdatepicker.com/ */

import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker.css";
// import S3 from "react-aws-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
// AWS Cognito to get temporary credentials
import getAwsCredentials from "../../../utils/cognito";
import { auth } from "../../../utils/firebase";
import Button from "./Button";
import "./NewBoatForm.css";


// In Webpack version 5, Webpack no longer automatically polyfill's Node.js API's if they are not natively supported anymore.
// The browser environment does not support Buffer natively, therefore we now need to add a third party Buffer package and point Node.js
// to it in the Webpack config
// Ref: https://stackoverflow.com/questions/69686231/react-s3-error-referenceerror-buffer-is-not-defined
window.Buffer = window.Buffer || require("buffer").Buffer;

const initialValues = {
  name: "",
  description: "",
  image: "",
};

// Set locale for DatePicker (so that week starts on Monday)
registerLocale("en", enGB);
setDefaultLocale("en");

/* Yup is designed for front-end browser based use. */
/* For server-side object schema validation with NodeJS, Joi is the choice */

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required(),
  description: Yup.string().min(3).max(500),
  image: Yup.string(),
  firstseen: Yup.date(),
  seen: Yup.date(),
  countseen: Yup.number(),
});

// AWS S3 Client with Cognito temporary credentials
const createS3Client = (firebaseToken) => {
  const credentials = getAwsCredentials(firebaseToken);

  return new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    requestChecksumCalculation: "WHEN_REQUIRED",
    credentials,
  });
};

// AWS S3 Upload Boat Image Function
const uploadBoatImageS3 = async (fileinput, filename) => {
  const firebaseToken = await auth.currentUser.getIdToken(true);
  const s3 = await createS3Client(firebaseToken);

  const extension = fileinput.name.split(".")[1];
  const newFileName = filename + "." + extension;

  const key = `${process.env.REACT_APP_AWS_DIR_NAME}/${newFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: key,
    Body: fileinput,
    ContentType: fileinput.type,
  });

  // Upload image to S3
  await s3.send(command);

  toast("Boat image uploaded to S3!", {
    type: "success",
    autoClose: 1500,
  });
};

const NewBoatForm = () => {
  const [pickDate, setPickDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef();
  const history = useHistory();

  // AWS S3 Config
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    dirName: process.env.REACT_APP_AWS_DIR_NAME,
    region: process.env.REACT_APP_AWS_REGION,
  };

  // const config = {
  //   bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  //   dirName: process.env.REACT_APP_AWS_DIR_NAME,
  //   region: process.env.REACT_APP_AWS_REGION,
  //   accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  //   secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
  // };

  // AWS S3 Upload
  // const imageS3Uploader = (fileInput, filename) => {
  //   const file = fileInput.current.files[0];
  //   const extension = file.name.split(".")[1];
  //   const newFileName = filename + "." + extension;

  //   const ReactS3Client = new S3(config);
  //   ReactS3Client.uploadFile(file, newFileName)
  //     .then((data) => {
  //       //console.log(data);
  //       if (data.status === 204) {
  //         console.log("AWS S3 File upload successful!");
  //       } else {
  //         toast("Ops! Upload to S3 failed", { type: "error" });
  //         console.error("AWS S3 File Failed to upload to S3 failed!");
  //       }
  //     })
  //     .catch((err) => {
  //       toast("Ops! Upload to S3 failed", { type: "error" });
  //       console.error("Failed to upload to S3. Error: ", err.message);
  //     });
  // };

  const onSubmit = (values) => {
    console.log("Form data", values);
    setIsLoading(true);

    // We name the image file as the boat name
    const imageName = values.name;
    const extension = fileInput.current.files[0].name.split(".")[1];

    // Create new boat object to be sent to backend
    const newboat = {
      name: values.name,
      description: values.description,
      firstseen: pickDate,
      lastseen: pickDate,
      image: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${imageName}.${extension}`, //https://rheinschiff-react-app.s3.eu-central-1.amazonaws.com/public/images/Sputnik.jpg
    };

    // Upload boat image to AWS S3 bucket
    uploadBoatImageS3(fileInput.current.files[0], imageName);
    // imageS3Uploader(fileInput, imageName);

    // TO DO: Modify the code with async await to get control over function results
    // If file upload to S3 was successful, POST to upload boat
    // if (result === "success") {
    axios
      .post("/api/boats", newboat)
      .then(() => {
        toast("New boat was added!", { type: "success", autoClose: 1500 });
        history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast("A boat with this name already exists!", { type: "error" });
        } else {
          toast("Ops! Something went wrong", { type: "error" });
        }
        console.error("Error fetching data with axios: ", error);
      });
    // If file upload to S3 failed return error message
    // } else {
    //   toast("Ops! Something went wrong", { type: "error" });
    //   console.log("Error when trying to upload image to AWS S3");
    // }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  console.log("Visited fields", formik.touched);

  return (
    <form className="newboat-form" onSubmit={formik.handleSubmit}>
      <div className="form-new-boat">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter boat name..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="form-new-boat">
        <label htmlFor="description">Description</label>
        <input
          type="textarea"
          id="description"
          name="description"
          placeholder="Enter boat description..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="form-new-boat">
        <label htmlFor="dateseen">Date seen</label>
        <DatePicker
          showIcon
          selected={pickDate}
          onChange={(date) => {
            setPickDate(date);
            //formik.values.dateseen = date;
          }}
          withPortal
          value={formik.values.dateseen}
        />
      </div>

      <div className="form-new-boat">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          ref={fileInput}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
          accept="image/png, image/jpeg"
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="error">{formik.errors.image}</div>
        ) : null}
      </div>

      <Button
        type="submit"
        loading={isLoading}
        disabled={
          !formik.values.name ||
          !formik.values.description ||
          !formik.values.image
        }
      >
        Submit New Boat
      </Button>
    </form>
  );
};

/* 
https://reactdatepicker.com/ 
<div className="container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div> */

export default NewBoatForm;
