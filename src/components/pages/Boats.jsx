import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import ScrollToTop from "../layout/Navigation/ScrollToTop";
import SchiffListe from "../boats/SchiffListe/SchiffListe";
//import Pagination from "../layout/Navigation/Pagination";
import ReactPaginate from "react-paginate";
import "../layout/Navigation/ReactPaginate.css";
import Footer from "../layout/Navigation/Footer";

const Boats = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [boatsPerPage] = useState(20);
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
        if (error.response) {
          // Request was made and the server responded with a status code that falls out of the range 2xx
          console.error(
            "HTTP Status code: " +
              error.response.status +
              "; Error Data: " +
              error.response.data
          );
        } else if (error.request) {
          // Request was made but no response was received. 'error.request' is an instance of XMLHttpRequest
          // in the browser and an instance http.ClientRequest in Node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error fetching data with Axios: ", error.message);
        }
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
  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  // Get current boats
  const offset = currentPage * boatsPerPage;
  const paginatedItems = boats_db.slice(offset, offset + boatsPerPage);

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
          <SchiffListe loading={loading} boats={paginatedItems} />
          <ReactPaginate
            containerClassName="pagination"
            pageClassName="page-item"
            activeClassName="active"
            previousLinkClassName="previous-pagination"
            previousLabel="Prev"
            nextLinkClassName="next-pagination"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(boats_db.length / boatsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
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
