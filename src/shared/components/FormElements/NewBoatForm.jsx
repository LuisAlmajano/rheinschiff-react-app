/* Tutorial on formik here: https://www.youtube.com/watch?v=Gcs9cBI2Cw8&list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu&index=12 */

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";

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
  const history = useHistory();

  const onSubmit = (values) => {
    console.log("Form data", values);

    const newboat = {
      name: values.name,
      description: values.description,
      image: values.image,
    };

    axios
      .post("http://localhost:3001/api/boats", newboat)
      .then(() => {
        history.push("/");
      })
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
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
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          name="image"
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
