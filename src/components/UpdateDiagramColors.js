// @flow

import * as React from "react";

type Selector = string;
type Property = string;
type Value = string;

type Setters = { [Selector]: { [Property]: Value } };

type Props = {
  children: React.Node,
  set?: Setters
};

export default ({ children }: Props) => null;
