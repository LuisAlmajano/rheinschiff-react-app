import "./Featured.css";

import PropTypes from "prop-types";

const Featured = ({ type, counter }) => {
  let data;

  switch (type) {
    case "mostSeen":
      data = {
        title: "BOAT MOST FREQUENTLY SEEN",
        counter: counter,
        link: "See all boats",
      };

      break;
    case "lastSeen":
      data = {
        title: "BOAT LAST SEEN",
        counter: counter,
        link: "See all boats",
      };

      break;
    case "firstSeen":
      data = {
        title: "BOAT FIRST SEEN",
        counter: counter,
        link: "See all boats",
      };

      break;

    default:
      break;
  }

  return (
    <div className="featured">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">20%</div>
      </div>
    </div>
  );
};

Featured.propTypes = {
  type: PropTypes.string,
  counter: PropTypes.number,
};

export default Featured;
