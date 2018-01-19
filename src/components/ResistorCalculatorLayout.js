// @flow

import * as React from "react";

import type { BandColors } from "./ResistorCalculator";
import {
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector
} from "./bandSelectors";
import { interleave } from "../utils";
import ResistorImage from "./ResistorImage";

import "./ResistorCalculatorLayout.css";

type SpacerProps = {
  children: Array<React.Node>,
  padTo?: number,
  spacing: Array<number>
};

const add = (a, b) => a + b;
const sum = (arr: Array<*>) => arr.reduce(add, 0);

const addPadding = (spacing: Array<*>, padTo: number) => {
  const spacingSum = sum(spacing);

  return spacingSum > padTo ? spacing : spacing.concat(padTo - spacingSum);
};

const Spacer = ({
  children,
  padTo,
  spacing = [],
  ...remainingProps
}: SpacerProps) => {
  const actualSpacing = padTo ? addPadding(spacing, padTo) : spacing;
  const spacers = actualSpacing.map((spacerSize, spacerIndex) => (
    <div key={spacerIndex} style={{ flexGrow: spacerSize }} />
  ));

  const newChildren = interleave(spacers, children);

  return <div {...remainingProps}>{newChildren}</div>;
};

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
    <div>
      Resistance value: {resistance} {tolerance}
    </div>
    <div>
      Range: {minimum} to {maximum}
    </div>
  </div>
);
