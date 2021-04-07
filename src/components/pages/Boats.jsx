import React, { Fragment, useState } from "react";
import axios from "axios";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import SchiffListe from "../boats/SchiffListe/SchiffListe";
import Footer from "../layout/Navigation/Footer";

const Boats = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [searchedBoat, setSearchedBoat] = useState();
  let searched = null;

  React.useEffect(() => {
    /* 
      Inspired by https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
      Section 6: Promises + Async/Await Syntax
      
    */
    setLoading(true);
    axios
      .get("http://localhost:3001/api/boats")
      .then((result) => {
        setBoats(result.data);
        setLoading(false);
        console.log("Boats retrieved from MongoDB:", boats_db);
      })
      .catch((error) => {
        console.error("Error fetching data with axios: ", error);
        setLoading(false);
      });
  }, []);

  const filterBoats = (text) => {
    const filter = boats_db.filter((boat) => {
      const regex = new RegExp(`${text}`, "gi");
      return boat.name.match(regex);
    });
    setFiltered(filter);
  };

  const clearFilter = () => {
    setFiltered(null);
  };

  return (
    <Fragment>
      <SearchAppBarDrawer filterBoats={filterBoats} clearFilter={clearFilter} />
      {filtered ? (
        <SchiffListe loading={loading} boats={filtered} />
      ) : (
        <SchiffListe loading={loading} boats={boats_db} />
      )}
      <Footer />
    </Fragment>
  );
};

export default Boats;
