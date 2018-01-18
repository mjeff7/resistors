// @flow

import React from "react";

import type { BandColors } from "./ResistorCalculator";
import {
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector
} from "./bandSelectors";
import type { ToleranceValue } from "../calculator/values";
import ResistorImage from "./ResistorImage";

type Props = BandColors & {
  resistance: number,
  tolerance: ToleranceValue,
  minimum: number,
  maximum: number,
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
    <ResistorImage {...{ bandAColor, bandBColor, bandCColor, bandDColor }} />
    <FirstBandSelector value={bandAColor} onSelectValue={setBandAColor} />
    <SecondBandSelector value={bandBColor} onSelectValue={setBandBColor} />
    <MultiplierBandSelector value={bandCColor} onSelectValue={setBandCColor} />
    <ToleranceBandSelector value={bandDColor} onSelectValue={setBandDColor} />
    <div>Resistance value: {resistance}</div>
    <div>Tolerance: {tolerance}</div>
    <div>Minimum: {minimum}</div>
    <div>Maximum: {maximum}</div>
  </div>
);
