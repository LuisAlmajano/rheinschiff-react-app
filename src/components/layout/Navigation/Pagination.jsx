// Credits: https://www.youtube.com/watch?v=IYCa1F-OWmk&list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb&index=10

import React from "react";

import "./Pagination.css";

const Pagination = ({ boatsPerPage, totalBoats, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBoats / boatsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
