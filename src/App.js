import React, { Component, useState } from "react";
import SchiffListe from "./components/SchiffListe/SchiffListe";
import SearchField from "./components/SearchField/SearchField";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import "./App.css";

class App extends Component {
  state = {
    schiffBeispiele: [
      
      {
        id: 1,
        name: "Tarragona",
        image: "https://picsum.photos/200",
        timeseen: "2021-09-01",
        countseen: 2,
      },
      {
        id: 2,
        name: "Veerman",
        image: "https://picsum.photos/400",
        timeseen: "2021-01-11",
        countseen: 1,
      },
      {
        id: 3,
        name: "Sophie Schwarz",
        image: "https://picsum.photos/300",
        timeseen: "2021-09-01",
        countseen: 1,
      },
      {
        id: 4,
        name: "Schwarz",
        image: "https://picsum.photos/300",
        timeseen: "2021-09-01",
        countseen: 5,
      },
    ],
  };

  addNewBoatHandler = (newBoat) => {
    const schiffBeispiele = this.state.schiffBeispiele.concat(newBoat);
    this.setState({ schiffBeispiele });
  };

  render() {
    return (
      <main className="container">
        <SearchAppBar onNewBoat={this.addNewBoatHandler} />
        {/* <SearchField
          placeholder="Suche nach Schiffe"
          onNewBoat={this.addNewBoatHandler}
          //onChange={() => console.log("Typed in search field")}
        /> */}
        <SchiffListe schiffe={this.state.schiffBeispiele} />
      </main>
    );
  }
}

export default App;
