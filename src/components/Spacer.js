// @flow

import * as React from "react";

import { interleave } from "../utils";

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

export default Spacer;
