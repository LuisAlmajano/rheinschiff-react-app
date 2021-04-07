import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

class NavLinks extends Component {
  state = {};
  render() {
    return (
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Boats
          </NavLink>
        </li>
        <li>
          <NavLink to="/boats/new">Add Boat</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    );
  }
}

export default NavLinks;
