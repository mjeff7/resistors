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
    path={resistorImageData}
    set={getTargetsToAdjust(props)}
    className="resistorImage"
    wrapperClassName="resistorImageWrapper"
  />
);
