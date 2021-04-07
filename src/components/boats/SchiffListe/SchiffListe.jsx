import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../../layout/UIElements/Spinner";
import Schiff from "../Schiff/Schiff";
import Card from "../../layout/UIElements/Card";
import Button from "../../layout/FormElements/Button";

import "./SchiffListe.css";

const SchiffListe = ({ loading, boats }) => {
  if (loading) {
    return <Spinner />;
  } else {
    if (boats.length === 0) {
      return (
        <div className="center">
          <Card className="empty-list">
            <h3>No boats found. Would you like to add a new boat?</h3>
            <div>
              <Link to="/boats/new">
                <Button>Add New Boat</Button>
              </Link>
            </div>
          </Card>
        </div>
      );
    } else if (boats.name) {
      return (
        <ul className="schiff-list">
          <Schiff key={boats._id} boat={boats} />
        </ul>
      );
    } else {
      return (
        <ul className="schiff-list">
          {boats.map((boat) => (
            <Schiff key={boat._id} boat={boat} />
          ))}
        </ul>
      );
    }
  }
};

SchiffListe.propTypes = {
  loading: PropTypes.bool.isRequired,
  boats: PropTypes.array.isRequired,
};

export default SchiffListe;
