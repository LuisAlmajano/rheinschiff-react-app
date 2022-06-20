import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Spinner from "../layout/UIElements/Spinner";
import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import SchiffDetail from "../boats/SchiffDetail/SchiffDetail";
import SchiffListe from "../boats/SchiffListe/SchiffListe";
import Footer from "../layout/Navigation/Footer";

const Boat = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    /* 
      Inspiration from https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
    */
    setLoading(true);
    axios
      .get("/api/boats")
      .then((result) => {
        setBoats(result.data);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
  }, []);

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  //  const boatId = parseInt(useParams().boatId); used since id was an integer in DUMMY_BOATS, but is a string in MongoDB.
  const boatId = useParams().boatId;
  const loadedBoat = boats_db.find((boat) => boat._id === boatId);

  console.log("loadedBoat: ", loadedBoat);

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

  if (loading) {
    return <Spinner />;
  } else {
    if (!loadedBoat) {
      return (
        <div className="center">
          <h2>Could not find boat!</h2>
        </div>
      );
    }

    return (
      <Fragment>
        <SearchAppBarDrawer
          filterBoats={filterBoats}
          clearFilter={clearFilter}
        />
        {filtered && filtered.length > 1 ? (
          <SchiffListe boats={filtered} />
        ) : (
          <SchiffDetail loadedBoat={loadedBoat} />
        )}

        <Footer />
      </Fragment>
    );
  }
};

export default Boat;
