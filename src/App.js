// @flow

import React from "react";
import ResistorCalculator from "./components/ResistorCalculator";
import "./App.css";

const App = () => (
  <div>
    <div className="titleBlock">
      <div className="title">Resistance Calculator</div>
      <div className="subTitle">Turn color bands into resistor specs</div>
    </div>
    <ResistorCalculator />
  </div>
);

export default App;
