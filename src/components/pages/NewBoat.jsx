import React from "react";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import NewBoatForm from "../layout/FormElements/NewBoatForm";

const NewBoat = () => {
  const addNewBoatHandler = (newBoat) => {
    /*
    const boats = boats_dummy.concat(newBoat);
    setBoatsDummy(boats);
    */
  };

  return (
    <React.Fragment>
      <SearchAppBarDrawer onNewBoat={addNewBoatHandler} />
      <NewBoatForm />
    </React.Fragment>
  );
};

export default NewBoat;
