// @flow

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import UpdateDiagramColors from "./UpdateDiagramColors";
import resistorImageData from "../assets/resistor.svg";

export default ({
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor
}: BandColors) => (
  <UpdateDiagramColors>
    <object data={resistorImageData} aria-label="Resistor diagram" />
  </UpdateDiagramColors>
);
