// Credits: https://www.youtube.com/watch?v=yKV1IGahXqA

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import "./Dashboard.css";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import Footer from "../layout/Navigation/Footer";
import Widget from "../layout/UIElements/widget/Widget";
import Featured from "../layout/UIElements/featured/Featured";
import Chart from "../layout/UIElements/chart/Chart";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [counterTotalBoats, setCounterTotalBoats] = useState(0);
  const [counterBoats2021, setCounterBoats2021] = useState(0);
  const [counterBoats2022, setCounterBoats2022] = useState(0);
  const [counterBoatsMonth2021, setCounterBoatsMonth2021] = useState([]);
  const [counterBoatsMonth2022, setCounterBoatsMonth2022] = useState([]);

  const BoatsSeeninYear = (boats, year) => {
    let counter = 0;

    boats.forEach((boat) => {
      if (
        boat.firstseen.includes(year) ||
        (boat.lastseen && boat.lastseen.includes(year))
      )
        counter++;
    });

    return counter;
  };

  const BoatsSeeninMonth = (boats, year, month) => {
    const boatsInMonth = boats.filter((boat) =>
      boat.firstseen.includes(year + "-" + month)
    );
    console.log(`Boats seen in ${month}, ${year}: `, boatsInMonth);
    return boatsInMonth.length;
  };

  const BoatsSeeninYearPerMonth = (boats, year) => {
    let boatsMonthAccumulated = [];

    const m = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    for (let i = 0; i < 12; i++) {
      boatsMonthAccumulated[i] = BoatsSeeninMonth(boats, year, m[i]);
    }

    console.log(`Boats per Month (${year}): `, boatsMonthAccumulated);
    return boatsMonthAccumulated;
  };

  const BoatsMostSeen = (boats) => {
    const counterMostSeen = boats.reduce(
      (acc, boat) => (acc = acc > boat.countseen ? acc : boat.countseen),
      0
    );
    console.log("counterMostSeen: ", counterMostSeen);
  };

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
        BoatsMostSeen(result.data);
        //BoatsSeeninMonth(result.data, 2022, "07");
        setCounterBoatsMonth2021(BoatsSeeninYearPerMonth(result.data, 2021));
        setCounterBoatsMonth2022(BoatsSeeninYearPerMonth(result.data, 2022));
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
      <div className="header">RheinSchiff Dashboard</div>
      <div className="widgets">
        <Widget type="boats" counter={counterTotalBoats} loading={loading} />
        <Widget type="boats2021" counter={counterBoats2021} />
        <Widget type="boats2022" counter={counterBoats2022} />
      </div>
      <div className="highlightsContainer">
        <div className="highlights">
          <Featured type="mostSeen" />
          <Featured type="lastSeen" />
          <Featured type="firstSeen" />
        </div>
        <div className="charts">
          <Chart
            loading={loading}
            counter2021={counterBoatsMonth2021}
            counter2022={counterBoatsMonth2022}
          />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Dashboard;
