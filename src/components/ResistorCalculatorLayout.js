// @flow

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import {
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector
} from "./bandSelectors";
import ResistorImage from "./ResistorImage";

import "./ResistorCalculatorLayout.css";

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
    <div className="imageAndSelectors">
      <ResistorImage {...{ bandAColor, bandBColor, bandCColor, bandDColor }} />
      <div className="selectors">
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
      </div>
    </div>
    <div>
      Resistance value: {resistance} {tolerance}
    </div>
    <div>
      Range: {minimum} to {maximum}
    </div>
  </div>
);
