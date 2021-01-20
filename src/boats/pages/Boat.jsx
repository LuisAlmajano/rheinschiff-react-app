import React from "react";
import { useParams } from "react-router-dom";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import SchiffDetail from "../components/SchiffDetail/SchiffDetail";

const Boat = () => {
  const [DUMMY_BOATS, setBoats] = React.useState([
    {
      id: 1,
      name: "Tarragona",
      image: "https://picsum.photos/300",
      timeseen: "2021-09-01",
      countseen: 2,
    },
    {
      id: 2,
      name: "Veerman",
      image: "https://picsum.photos/400",
      timeseen: "2021-01-11",
      countseen: 1,
    },
    {
      id: 3,
      name: "Sophie Schwarz",
      image: "https://picsum.photos/300",
      timeseen: "2021-09-01",
      countseen: 1,
    },
  ]);

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  const boatId = parseInt(useParams().boatId);
  const loadedBoat = DUMMY_BOATS.filter((boat) => boat.id === boatId);

  // loadedBoat is an array of objects, so index [0] to reach first object
  console.log("loadedBoat.name: ", loadedBoat[0].name);

  const addNewBoatHandler = (newBoat) => {
    const boats = DUMMY_BOATS.concat(newBoat);
    setBoats(boats);
  };

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <SchiffDetail
        key={loadedBoat[0].id}
        id={loadedBoat[0].id}
        name={loadedBoat[0].name}
        image={loadedBoat[0].image}
        timeseen={loadedBoat[0].timeseen}
        countseen={loadedBoat[0].countseen}
      />
    </React.Fragment>
  );
};

export default Boat;
