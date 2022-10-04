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
            <a
              onClick={() => {
                paginate(number);
                // First, we remove active class from all pages...
                for (
                  let i = 0;
                  i < document.querySelectorAll(".page-link").length;
                  i++
                ) {
                  document
                    .querySelectorAll(".page-link")
                    [i].classList.remove("active");
                }
                // ...then we set the new page as active
                document
                  .querySelectorAll(".page-link")
                  [number - 1].classList.add("active");
              }}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
