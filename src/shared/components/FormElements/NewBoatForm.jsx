/* Tutorial on formik here: https://www.youtube.com/watch?v=Gcs9cBI2Cw8&list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu&index=12 */
/* https://www.npmjs.com/package/react-datepicker */
/* https://reactdatepicker.com/ */

import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker.css";
import S3 from "react-aws-s3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "./Button";
import "./NewBoatForm.css";

const initialValues = {
  name: "Enter boat name...",
  description: "",
  image: "",
};

/* Yup is designed for front-end browser based use. */
/* For server-side object schema validation with NodeJS, Joi is the choice */

const validationSchema = Yup.object({
  name: Yup.string().min(4).max(50).required(),
  description: Yup.string().min(4).max(200),
  image: Yup.string(),
  timeseen: Yup.date(),
  countseen: Yup.number(),
});

const NewBoatForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const fileInput = useRef();
  const history = useHistory();

  // AWS S3 Config
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    dirName: process.env.REACT_APP_AWS_DIR_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
  };

  // AWS S3 Upload
  const imageS3Uploader = (fileInput, filename) => {
    let file = fileInput.current.files[0];
    let newFileName = filename + ".jpg";

    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        //console.log(data);
        if (data.status === 204) {
          console.log("AWS S3 File upload successful!");
        } else {
          console.log("AWS S3 File Failed to upload to S3 failed!");
        }
      })
      .catch((err) => console.log("Failed to upload to S3", err.message));
  };

  const onSubmit = (values) => {
    console.log("Form data", values);

    const newboat = {
      name: values.name,
      description: values.description,
      timeseen: values.dateseen,
      image: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${values.name}.jpg`, //https://rheinschiff-react-app.s3.eu-central-1.amazonaws.com/public/images/Sputnik.jpg
    };

    // Upload file to AWS S3 bucket
    // console.log("File: ", fileInput.current.files[0]);
    // console.log("File name: ", fileInput.current.files[0].name);
    // console.log("Image: ", values.name);
    console.log("Timeseen: ", newboat.timeseen);
    imageS3Uploader(fileInput, values.name);

    // If file upload to S3 was successful, POST to upload boat
    // if (result === "success") {
    axios
      .post("http://localhost:3001/api/boats", newboat)
      .then(() => {
        toast("New boat was added!", { type: "success" });
        history.push("/");
      })
      .catch((error) => {
        toast("Ops! Something went wrong", { type: "error" });
        console.error("Error fetching data with axios: ", error);
      });
    // If file upload to S3 failed return error message
    // } else {
    //   toast("Ops! Something went wrong", { type: "error" });
    //   console.log("Error when trying to upload image to AWS S3");
    // }
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
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            formik.values.dateseen = date;
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
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="error">{formik.errors.image}</div>
        ) : null}
      </div>

      <Button type="submit">Submit New Boat</Button>
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
