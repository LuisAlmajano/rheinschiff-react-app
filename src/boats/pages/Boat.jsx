import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import SchiffDetail from "../components/SchiffDetail/SchiffDetail";

const Boat = () => {
  const [boats_db, setBoats] = React.useState([]);

  const [DUMMY_BOATS, setBoatsDummy] = React.useState([
    {
      _id: "1",
      name: "Tarragona",
      image: "https://picsum.photos/300",
      timeseen: "2021-09-01",
      countseen: 2,
    },
    {
      _id: "2",
      name: "Veerman",
      image: "https://picsum.photos/400",
      timeseen: "2021-01-11",
      countseen: 1,
    },
    {
      _id: "3",
      name: "Sophie Schwarz",
      image: "https://picsum.photos/300",
      timeseen: "2021-09-01",
      countseen: 1,
    },
  ]);

  const addNewBoatHandler = (newBoat) => {
    const boats = DUMMY_BOATS.concat(newBoat);
    setBoatsDummy(boats);
  };

  React.useEffect(() => {
    /* 
      Inspiration from https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
    */
    axios
      .get("http://localhost:3001/api/boats")
      .then((result) => setBoats(result.data))
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
  }, []);

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  //  const boatId = parseInt(useParams().boatId); used since id was an integer in DUMMY_BOATS, but is a string in MongoDB.
  const boatId = useParams().boatId;
  const loadedBoat = boats_db.find((boat) => boat._id === boatId);

  // loadedBoat is an array of objects, so index [0] to reach first object
  console.log("loadedBoat: ", loadedBoat);

  if (!loadedBoat) {
    return (
      <div className="center">
        <h2>Could not find boat!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <SchiffDetail
        key={loadedBoat._id}
        id={loadedBoat._id}
        name={loadedBoat.name}
        image={loadedBoat.image}
        timeseen={loadedBoat.timeseen}
        countseen={loadedBoat.countseen}
      />
    </React.Fragment>
  );
};

export default Boat;
