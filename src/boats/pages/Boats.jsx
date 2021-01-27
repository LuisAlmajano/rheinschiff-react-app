import React from "react";
import axios from "axios";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import SchiffListe from "../components/SchiffListe/SchiffListe";

const Boats = () => {
  const [boats_db, setBoats] = React.useState([]);

  const [boats_dummy, setBoatsDummy] = React.useState([
    {
      _id: "1",
      name: "Tarragona",
      image: "https://picsum.photos/200",
      timeseen: "2020-09-01",
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
      timeseen: "2020-09-01",
      countseen: 1,
    },
  ]);

  const addNewBoatHandler = (newBoat) => {
    const boats = boats_dummy.concat(newBoat);
    setBoatsDummy(boats);
  };

  React.useEffect(() => {
    /* 
      Inspired by https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
      Section 6: Promises + Async/Await Syntax
      
    */
    axios
      .get("http://localhost:3001/api/boats")
      .then((result) => setBoats(result.data))
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
  }, []);

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <SchiffListe boats={boats_db} />
    </React.Fragment>
  );
};

export default Boats;
