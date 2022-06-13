import React, { Fragment } from "react";
import "./Dashboard.css";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import Footer from "../layout/Navigation/Footer";
import Widget from "../layout/UIElements/widget/Widget";

const Dashboard = () => {
  return (
    <Fragment>
      <SearchAppBarDrawer />
      <h1>Rheinschiff Dashboard</h1>
      <div className="widgets">
        <Widget type="boats" />
        <Widget type="boats2021" />
        <Widget type="boats2022" />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
