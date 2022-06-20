import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import "./Dashboard.css";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import Footer from "../layout/Navigation/Footer";
import Widget from "../layout/UIElements/widget/Widget";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [counterTotalBoats, setCounterTotalBoats] = useState(0);
  const [counterBoats2021, setCounterBoats2021] = useState(0);
  const [counterBoats2022, setCounterBoats2022] = useState(0);

  const BoatsSeeninYear = (boats, year) => {
    let counter = 0;

    boats.map((boat) => {
      if (boat.lastseen && boat.lastseen.includes(year)) counter++;
    });

    return counter;
  };

  const BoatsMostSeen = (boats) => {};

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/boats")
      .then((result) => {
        setCounterTotalBoats(result.data.length);
        console.log("Boats in MongoDB: ", result.data);
        setCounterBoats2021(BoatsSeeninYear(result.data, 2021));
        console.log("Boats in 2021: ", BoatsSeeninYear(result.data, 2021));
        setCounterBoats2022(BoatsSeeninYear(result.data, 2022));
        console.log("Boats in 2022: ", BoatsSeeninYear(result.data, 2022));
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching data with axios (Widget component): ",
          error
        );
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <SearchAppBarDrawer />
      <h1>Rheinschiff Dashboard</h1>
      <div className="widgets">
        <Widget type="boats" loading={loading} counter={counterTotalBoats} />
        <Widget type="boats2021" counter={counterBoats2021} />
        <Widget type="boats2022" counter={counterBoats2022} />
      </div>
      <div className="highlights">
        
      </div>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
