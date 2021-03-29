import React, { useState } from "react";
import axios from "axios";

import SearchAppBarDrawer from "../../shared/components/Navigation/SearchAppBarDrawer";
import SchiffListe from "../components/SchiffListe/SchiffListe";
import Footer from "../../shared/components/Navigation/Footer";

const Boats = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const SearchBoat = (enteredText) => {
    console.log("------SearchBoat function called-----", searchedBoat);
    // Search for given Boat in the list of boats from MongoDB
    // Only search if user entered text
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
  // If a boat was found
  if (searchedBoat) {
    console.log(
      "IF STATEMENT - Searched Boat exists within the list of boats: ",
      searchedBoat
    );
    console.log("searchedBoat.length: ", searchedBoat.length);
    return (
      <React.Fragment>
        <SearchAppBarDrawer onSearch={SearchBoat} />
        <SchiffListe loading={loading} boats={searchedBoat} />
        <Footer />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <SearchAppBarDrawer onSearch={SearchBoat} />
        <SchiffListe loading={loading} boats={boats_db} />
        <Footer />
      </React.Fragment>
    );
  }
};

export default Boats;
