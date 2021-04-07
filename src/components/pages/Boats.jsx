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

  const SearchBoat = (enteredText) => {
    console.log("------SearchBoat function called-----", searchedBoat);
    // Search for given Boat in the list of boats from MongoDB
    // Only search if user entered text
    // Check Filter code from ContactKeeper App
    // const regex = new RegExp(`enteredText`, "gi");
    // filtered: state.contacts.filter((contact) => {
    //   const regex = new RegExp(`${action.payload}`, "gi");
    //   return contact.name.match(regex) || contact.email.match(regex);

    if (enteredText) {
      searched = boats_db.find((boat) => boat.name === enteredText);
      if (searched) {
        setSearchedBoat(searched);
        console.log("A boat with this name was found!");
        // console.log("enteredText: ", enteredText);
        console.log("Searched Boat within the list of boats: ", searched);
        console.log("searchedBoat useState: ", searchedBoat);
      } else {
        console.log("NO boat with this name was found", enteredText);
      }
    }
  };

  return (
    <Fragment>
      <SearchAppBarDrawer
        onSearch={SearchBoat}
        filterBoats={filterBoats}
        clearFilter={clearFilter}
      />
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
