// @flow

/*
 * ResistorImage
 *
 * A component that takes the current color selection and translates them into
 * attributes to adjust for visual feedback. Actual image and update is done
 * elsewhere.
 */

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import UpdateDiagramColors from "./UpdateDiagramColors";
import resistorImageData from "../assets/resistor.svg";
import COLOR_REPRESENTATIVES from "../colorRepresentatives";

const getTargetsToAdjust = ({
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor
}) => [
  ["#bandA", COLOR_REPRESENTATIVES[bandAColor]],
  ["#bandB", COLOR_REPRESENTATIVES[bandBColor]],
  ["#bandC", COLOR_REPRESENTATIVES[bandCColor]],
  [
    "#bandD",
    bandDColor === "none" ? "#0000" : COLOR_REPRESENTATIVES[bandDColor]
  ]
];

export default (props: BandColors) => (
  <UpdateDiagramColors
    path={resistorImageData}
    set={getTargetsToAdjust(props)}
    className="resistorImage"
    wrapperClassName="resistorImageWrapper"
  />
);
