// @flow

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import UpdateDiagramColors from "./UpdateDiagramColors";
import resistorImageData from "../assets/resistor.svg";

const getTargetsToAdjust = ({
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor
}) => [
  ["#bandA", bandAColor],
  ["#bandB", bandBColor],
  ["#bandC", bandCColor],
  ["#bandD", bandDColor === "none" ? "#0000" : bandDColor]
];

export default (props: BandColors) => (
  <UpdateDiagramColors
    data={resistorImageData}
    ariaLabel="Resistor diagram"
    set={getTargetsToAdjust(props)}
  />
);
