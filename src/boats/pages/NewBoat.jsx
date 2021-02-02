import React from "react";

import SearchAppBarDrawer from "../../shared/components/Navigation/SearchAppBarDrawer";
import NewBoatForm from "../../shared/components/FormElements/NewBoatForm";

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
