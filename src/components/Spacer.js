// @flow

/*
 * Spacer
 *
 * Simple display component that takes an array of React components as children
 * and an array and inserts div elements between and around the children. The
 * effect is the same as setting "justify-content: space-around" except
 * allowing to specify unequal spacing by passing in an array of spacings.
 */

import * as React from "react";

import { interleave } from "../utils";

const add = (a, b) => a + b;
const sum = (arr: Array<*>) => arr.reduce(add, 0);

const addPadding = (spacing: Array<*>, padTo: number) => {
  const spacingSum = sum(spacing);

  return spacingSum > padTo ? spacing : spacing.concat(padTo - spacingSum);
};

type Props = {
  // The elements to be spaced out. Space will be between each, before the
  // first, and after the last.
  children: Array<React.Node>,

  // An amount that is effectively the total proportion from which the spacings
  // are measured. For example, if padTo === 100, the values in spacing are
  // effectively percentages of the total space to allocate. Any unused space
  // is given at the end. This can make it easier to adjust spacing without
  // changing the weights of spacings. If padTo is not given or is 0, then the
  // spacings given account for all the space with none left over.
  padTo?: number,

  // The weights of space before each item with an additional final item for
  // the space after the final item. The available space is distributed
  // according to these weights, or if padTo is given, according to each weight
  // as a fraction of padTo.
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
