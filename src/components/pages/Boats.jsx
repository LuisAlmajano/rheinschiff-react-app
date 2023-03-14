import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import ScrollToTop from "../layout/Navigation/ScrollToTop";
import SchiffListe from "../boats/SchiffListe/SchiffListe";
import Pagination from "../layout/Navigation/Pagination";
import Footer from "../layout/Navigation/Footer";

const Boats = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [boatsPerPage] = useState(10);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    /* 
      Inspired by https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
      Section 6: Promises + Async/Await Syntax
      
    */
    setLoading(true);
    axios
      .get("/api/boats")
      .then((result) => {
        setBoats(result.data);
        setLoading(false);
        //console.log("Boats retrieved from MongoDB:", boats_db); boats_db does not hold boats data, yet.
        //console.log("Boats retrieved from MongoDB:", result.data);
        console.log(
          "Number of boats retrieved from MongoDB:",
          result.data.length
        );
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

  // Pagination logic
  // Change page
  const paginate = (pageNum) => setCurrentPage(pageNum);

  // Get current boats
  const indexOfLastBoat = currentPage * boatsPerPage;
  const indexOfFirstBoat = indexOfLastBoat - boatsPerPage;
  const currentBoats = boats_db.slice(indexOfFirstBoat, indexOfLastBoat);

  return (
    <Fragment>
      <SearchAppBarDrawer filterBoats={filterBoats} clearFilter={clearFilter} />
      {filtered ? (
        <Fragment>
          <ScrollToTop />
          <SchiffListe loading={loading} boats={filtered} />
        </Fragment>
      ) : (
        <Fragment>
          <ScrollToTop />
          <SchiffListe loading={loading} boats={currentBoats} />
          <Pagination
            boatsPerPage={boatsPerPage}
            totalBoats={boats_db.length}
            paginate={paginate}
          />
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

// @nice to have: Add transition to the filter
// import { CSSTransition, TransitionGroup } from "react-transition-group";
{
  /* <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment> */
}

export default Boats;
