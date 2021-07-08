import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "../../layout/UIElements/Avatar";
import Card from "../../layout/UIElements/Card";
import "./Schiff.css";

const Schiff = ({ boat }) => {
  const date = new Date(boat.firstseen);

  return (
    <li className="schiff-item">
      <Card className="schiff-item__content">
        <Link to={`/boats/${boat._id}`}>
          <div className="schiff-item__image">
            <Avatar image={boat.image} alt={boat.name} width="80px" />
          </div>
          <div className="schiff-item__info">
            <h2>{boat.name}</h2>
            <h4>
              Seen: {boat.countseen} {boat.countseen === 1 ? "Time" : "Times"}
            </h4>
            <h4>First seen on: {date.toDateString()}</h4>
          </div>
        </Link>
      </Card>
    </li>
  );
};

Schiff.propTypes = {
  boat: PropTypes.object.isRequired,
};

export default Schiff;
