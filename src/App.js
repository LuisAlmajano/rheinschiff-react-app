import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Boats from "./components/pages/Boats";
import Boat from "./components/pages/Boat";
import NewBoat from "./components/pages/NewBoat";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router basename={"/rheinschiff"}>
        <Switch>
          <Route path="/" exact component={Boats} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/boats/new" exact component={NewBoat} />
          <Route path="/boats/:boatId" exact component={Boat} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
