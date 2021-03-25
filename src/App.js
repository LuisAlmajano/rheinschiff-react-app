import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Boats from "./boats/pages/Boats";
import Boat from "./boats/pages/Boat";
import NewBoat from "./boats/pages/NewBoat";
import Login from "./boats/pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Boats} />
          <Route path="/login" exact component={Login} />
          <Route path="/boats/new" exact component={NewBoat} />
          <Route path="/boats/:boatId" exact component={Boat} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
