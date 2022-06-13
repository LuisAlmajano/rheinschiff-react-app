import React, { Fragment } from "react";

import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import Footer from "../layout/Navigation/Footer";

const Dashboard = () => {
  return (
    <Fragment>
      <SearchAppBarDrawer />
      <h1>Rheinschiff Dashboard</h1>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
