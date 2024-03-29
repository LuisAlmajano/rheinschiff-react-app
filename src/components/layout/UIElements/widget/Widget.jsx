import "./Widget.css";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import React from "react";

const Widget = ({ type, counter, loading }) => {
  let data;

  switch (type) {
    case "boats":
      data = {
        title: "TOTAL BOATS",
        counter: counter,
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(253,253,253, 0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2021":
      data = {
        title: "BOATS SIGHTED IN 2021",
        counter: counter,
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "mediumslateblue",
              backgroundColor: "rgba(253,253,253,0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2022":
      data = {
        title: "BOATS SIGHTED IN 2022",
        counter: counter,
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "mediumaquamarine",
              backgroundColor: "rgba(253,253,253, 0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2023":
      data = {
        title: "BOATS SIGHTED IN 2023",
        counter: counter,
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(253,253,253,0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2024":
      data = {
        title: "BOATS SIGHTED IN 2024",
        counter: counter,
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "coral",
              backgroundColor: "rgba(253,253,253,0.2)",
            }}
          />
        ),
      };

      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

Widget.propTypes = {
  type: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

export default Widget;
