// @flow

import React from "react";
import ResistorCalculator from "./components/ResistorCalculator";
import "./App.css";

const centeringStyle = {
  display: "inline-block",
  textAlign: "center",
  border: "1px solid black",
  margin: "1rem",
  padding: "1rem"
};

const App = () => (
  <div style={centeringStyle}>
    <ResistorCalculator />
  </div>
);

export default App;
