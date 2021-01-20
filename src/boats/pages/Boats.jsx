import React from "react";

import SearchAppBar from "../../shared/components/Navigation/SearchAppBar";
import SchiffListe from "../components/SchiffListe/SchiffListe";

const Boats = () => {
  const [boats_dummy, setBoats] = React.useState([
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
    setBoats(boats);
  };

  return (
    <React.Fragment>
      <SearchAppBar onNewBoat={addNewBoatHandler} />
      <SchiffListe boats={boats_dummy} />
    </React.Fragment>
  );
};

export default Boats;
