import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const NewBoat = () => {
  const [startDate, setStartDate] = useState(new Date());

  const addNewBoatHandler = (newBoat) => {
    /*
    const boats = boats_dummy.concat(newBoat);
    setBoatsDummy(boats);
    */
  };



  const boatSubmitHandler = (event) => {
    event.preventDefault();
    /* axios
      .post("http://localhost:3001/api/boats", DATA_HERE)
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      ); */
  };

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <form className="boat-form" onSubmit={boatSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Boat name"
          placeholder="Enter boat name..."
        />
        <Input
          id="image"
          element="input"
          type="text"
          label="Boat image"
          placeholder="Enter boat image URL..."
        />
        {/* <Input
          id="boat_notes"
          element="textarea"
          type="text"
          label="Notes"
          placeholder="Enter notes..."
        /> */}
        <Button type="submit">Add New Boat</Button>
      </form>
    </React.Fragment>
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

export default NewBoat;
