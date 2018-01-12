// @flow

import React from "react";

type Props = {
  options: Array<string | number>
};

export default ({ options }: Props) => (
  <select>
    {options.map((option, optionIndex) => (
      <option key={optionIndex}>{option}</option>
    ))}
  </select>
);
