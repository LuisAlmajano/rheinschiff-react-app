import React, { Component, useState } from "react";

import SchiffListe from "./components/SchiffListe/SchiffListe";
import SearchField from "./components/SearchField/SearchField";
import "./App.css";

class App extends Component {
  state = {
    schiffBeispiele: [
      { id: 1, name: "Tarragona", timeseen: "2021-09-01", countseen: 2 },
      { id: 2, name: "Veerman", timeseen: "2021-01-11", countseen: 1 },
      { id: 3, name: "Sophie", timeseen: "2021-09-01", countseen: 1 },
    ],
  };

  addNewBoatHandler = (newBoat) => {
    const schiffBeispiele = this.state.schiffBeispiele.concat(newBoat);
    this.setState({ schiffBeispiele });
  };

  render() {
    return (
      <main className="container">
        <SearchField
          placeholder="Suche nach Schiffe"
          onNewBoat={this.addNewBoatHandler}
          //onChange={() => console.log("Typed in search field")}
        />
        <SchiffListe schiffe={this.state.schiffBeispiele} />
      </main>
    );
  }
}

export default App;
