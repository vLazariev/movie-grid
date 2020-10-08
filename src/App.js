import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import Grid from "./components/Grid.js";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Grid />
      </div>
    );
  }
}
