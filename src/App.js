import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Boats from "./boats/pages/Boats";
import Boat from "./boats/pages/Boat";
import NewBoat from "./boats/pages/NewBoat";
import Login from "./boats/pages/Login";

class App extends Component {
  addNewBoatHandler = (newBoat) => {
    const schiffBeispiele = this.state.schiffBeispiele.concat(newBoat);
    this.setState({ schiffBeispiele });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Boats />
          </Route>
          <Route path="/boats/new" exact>
            <NewBoat />
          </Route>
          <Route path="/boats/:boatId" exact>
            <Boat />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
