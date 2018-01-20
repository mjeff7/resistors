// @flow

/*
 * ResistorCalculatorLayout
 *
 * A simple display component that presents the formatted resisitor specs to
 * user and allows the user to choose colors.
 */

import "./ResistorCalculatorLayout.css";

import * as React from "react";

import type { BandColors } from "./ResistorCalculator";
import {
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector
} from "./bandSelectors";
import ResistorImage from "./ResistorImage";
import Spacer from "./Spacer";

type Props = BandColors & {
  resistance: string,
  tolerance: string,
  minimum: string,
  maximum: string,
  setBandAColor: (*) => *,
  setBandBColor: (*) => *,
  setBandCColor: (*) => *,
  setBandDColor: (*) => *
};

export default ({
  resistance,
  tolerance,
  minimum,
  maximum,
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor,
  setBandAColor,
  setBandBColor,
  setBandCColor,
  setBandDColor
}: Props) => (
  <div>
    <div className="calculatedResistanceDisplay">
      <div>
        {resistance} {tolerance}
      </div>
      <div>
        {minimum} to {maximum}
      </div>
      <div className="caption">Resistor spec with these colors</div>
    </div>
    <div className="imageAndSelectors">
      <ResistorImage {...{ bandAColor, bandBColor, bandCColor, bandDColor }} />
      <Spacer className="selectors" padTo={100} spacing={[29.5, 8.5, 8, 19]}>
        <FirstBandSelector value={bandAColor} onSelectValue={setBandAColor} />
        <SecondBandSelector value={bandBColor} onSelectValue={setBandBColor} />
        <MultiplierBandSelector
          value={bandCColor}
          onSelectValue={setBandCColor}
        />
        <ToleranceBandSelector
          value={bandDColor}
          onSelectValue={setBandDColor}
        />
      </Spacer>
    </div>
  </div>
);
