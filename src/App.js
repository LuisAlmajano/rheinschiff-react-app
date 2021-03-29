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
import ProtectedRoute from './boats/pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Boats} />
          <Route path="/login" exact component={Login} />
          <Route path="/boats/new" exact component={NewBoat} />
          {/* <ProtectedRoute path='/boats/new' exact component={NewBoat} /> */}
          <Route path="/boats/:boatId" exact component={Boat} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
