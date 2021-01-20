import React from "react";
import axios from "axios";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import SchiffListe from "../components/SchiffListe/SchiffListe";

const Boats = () => {
  const [boats_db, setBoats] = React.useState([]);

  const [boats_dummy, setBoatsDummy] = React.useState([
    {
      id: 1,
      name: "Tarragona",
      image: "https://picsum.photos/200",
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

  const addNewBoatHandler = (newBoat) => {
    const boats = boats_dummy.concat(newBoat);
    setBoatsDummy(boats);
  };

  React.useEffect(() => {
    /* 
      The first .then() lets us get JSON data from the response.
      The second .then() gets the url to my avatar and puts it in state. 
    */
    axios.get("http://localhost:3001/api/boats")
    .then(result => setBoats(result.data))
    .catch(error => console.error("Error fetching data with axios: ", error));

    /* fetch("http://localhost:3001/api/boats")
      .then((response) => response.json())
      .then((data) => setBoats(data))
      .catch((error) => console.error("Error fetching data: ", error));
 */

  }, []);

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <SchiffListe boats={boats_db} />
    </React.Fragment>
  );
};

export default Boats;
