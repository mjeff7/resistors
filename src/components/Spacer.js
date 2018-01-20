// @flow

import * as React from "react";

import { interleave } from "../utils";

const add = (a, b) => a + b;
const sum = (arr: Array<*>) => arr.reduce(add, 0);

const addPadding = (spacing: Array<*>, padTo: number) => {
  const spacingSum = sum(spacing);

  return spacingSum > padTo ? spacing : spacing.concat(padTo - spacingSum);
};

type Props = {
  children: Array<React.Node>,
  padTo?: number,
  spacing: Array<number>
};

export default ({
  children,
  padTo,
  spacing = [],
  ...remainingProps
}: Props) => {
  const actualSpacing = padTo ? addPadding(spacing, padTo) : spacing;
  const spacers = actualSpacing.map((spacerSize, spacerIndex) => (
    <div key={spacerIndex} style={{ flexGrow: spacerSize }} />
  ));

  const newChildren = interleave(spacers, children);

  return <div {...remainingProps}>{newChildren}</div>;
};
