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
  const [counterBoats2023, setCounterBoats2023] = useState(0);
  const [counterBoatsMonth2021, setCounterBoatsMonth2021] = useState([]);
  const [counterBoatsMonth2022, setCounterBoatsMonth2022] = useState([]);
  const [counterBoatsMonth2023, setCounterBoatsMonth2023] = useState([]);
  const [boatMostSeen, setBoatMostSeen] = useState({});
  const [boatFirstSeen, setBoatFirstSeen] = useState({});
  const [boatLastSeen, setBoatLastSeen] = useState({});

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

  // Functions required for featured boats

  const BoatsMostSeen = (boats) => {
    // We sort all boats by countseen
    const boatsOrderedByCountSeen = boats.sort(
      (a, b) => b.countseen - a.countseen
    );
    console.log("------BoatsOrderedByCountSeen: ", boatsOrderedByCountSeen);
    console.log("------BoatMostSeen: ", boatsOrderedByCountSeen[0].name);

    // Return the boat with the max countseen.
    // TODO: Check if there are multiple boats with same countseen and return randomly one single boat
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      if (
        boatsOrderedByCountSeen[i].countseen ===
        boatsOrderedByCountSeen[i + 1].countseen
      ) {
        counter++;
      } else break;
    }
    console.log("----Counter: ", counter);
    console.log(
      "----Random number: ",
      Math.floor(Math.random() * (counter + 1))
    );

    return boatsOrderedByCountSeen[Math.floor(Math.random() * (counter + 1))];
  };

  const BoatsFirstSeen = (boats) => {
    // We sort all boats by firstseen date
    const boatsOrderedByFirstSeen = boats.sort(
      (a, b) => b.firstseen - a.firstseen
    );
    console.log("------BoatsOrderedByFirstSeen: ", boatsOrderedByFirstSeen);
    console.log("------BoatFirstSeen: ", boatsOrderedByFirstSeen[0].name);

    return boatsOrderedByFirstSeen[0];
  };

  const BoatsLastSeen = (boats) => {
    // We sort all boats by lastseen date
    const boatsOrderedByLastSeen = boats.sort(
      (a, b) => new Date(b.lastseen) - new Date(a.lastseen)
    );
    console.log("------BoatsOrderedByLastSeen: ", boatsOrderedByLastSeen);
    console.log("------BoatLastSeen: ", boatsOrderedByLastSeen[0].name);

    return boatsOrderedByLastSeen[0];
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/boats")
      .then((result) => {
        // Set total and yearly counters
        setCounterTotalBoats(result.data.length);
        console.log("Boats in MongoDB: ", result.data);
        setCounterBoats2021(BoatsSeeninYear(result.data, 2021));
        console.log("Boats in 2021: ", BoatsSeeninYear(result.data, 2021));
        setCounterBoats2022(BoatsSeeninYear(result.data, 2022));
        console.log("Boats in 2022: ", BoatsSeeninYear(result.data, 2022));
        setCounterBoats2023(BoatsSeeninYear(result.data, 2023));
        console.log("Boats in 2023: ", BoatsSeeninYear(result.data, 2023));
        //BoatsSeeninMonth(result.data, 2022, "07");

        // Set counters required for Chart
        setCounterBoatsMonth2021(BoatsSeeninYearPerMonth(result.data, 2021));
        setCounterBoatsMonth2022(BoatsSeeninYearPerMonth(result.data, 2022));
        setCounterBoatsMonth2023(BoatsSeeninYearPerMonth(result.data, 2023));

        // Set featured Boats
        setBoatMostSeen(BoatsMostSeen(result.data));
        console.log({ boatMostSeen });

        setBoatFirstSeen(BoatsFirstSeen(result.data));
        console.log({ boatFirstSeen });

        setBoatLastSeen(BoatsLastSeen(result.data));
        console.log({ boatLastSeen });

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
        <Widget type="boats" counter={counterTotalBoats} />
        <Widget type="boats2023" counter={counterBoats2023} />
        <Widget type="boats2022" counter={counterBoats2022} />
        <Widget type="boats2021" counter={counterBoats2021} />
      </div>
      <div className="highlightsContainer">
        <div className="highlights">
          <Featured
            type="lastSeen"
            featuredBoat={boatLastSeen}
            loading={loading}
          />
          <Featured
            type="mostSeen"
            featuredBoat={boatMostSeen}
            loading={loading}
          />
          <Featured
            type="firstSeen"
            featuredBoat={boatFirstSeen}
            loading={loading}
          />
        </div>
        <div className="charts">
          <Chart
            loading={loading}
            counter2021={counterBoatsMonth2021}
            counter2022={counterBoatsMonth2022}
            counter2023={counterBoatsMonth2023}
          />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Dashboard;
