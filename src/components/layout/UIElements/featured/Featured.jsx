import "./Featured.css";

import PropTypes from "prop-types";

const Featured = ({ type, featuredBoat }) => {
  let data;

  switch (type) {
    case "mostSeen":
      data = {
        title: "BOAT MOST FREQUENTLY SEEN",
        boat: featuredBoat,
        link: "See boat",
      };

      break;
    case "lastSeen":
      data = {
        title: "BOAT LAST SEEN",
        boat: featuredBoat,
        link: "See boat",
      };

      break;
    case "firstSeen":
      data = {
        title: "BOAT FIRST SEEN",
        boat: featuredBoat,
        link: "See boat",
      };

      break;

    default:
      break;
  }

  return (
    <div className="featured">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.boat}</span>
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
  featuredBoat: PropTypes.object,
};

export default Featured;
