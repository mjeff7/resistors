// @flow

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import resistorImageData from "../assets/resistor.svg";

export default ({
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor
}: BandColors) => (
  <object data={resistorImageData} aria-label="Resistor diagram" />
);
