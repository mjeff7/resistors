// @flow

import React from "react";
import ResistorCalculator from "./components/ResistorCalculator";
import "./App.css";

const App = () => (
  <div>
    <div className="title">Resistance Calculator</div>
    <div className="subTitle">Turn color bands into resistor specs</div>
    <ResistorCalculator />
  </div>
);

export default App;
