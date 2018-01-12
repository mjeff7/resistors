// @flow

import React from "react";

type Props = {
  onChange: number => mixed,
  options: Array<string | number>
};

export default ({ onChange, options }: Props) => (
  <select onChange={e => onChange(e.target.value)}>
    {options.map((option, optionIndex) => (
      <option key={optionIndex}>{option}</option>
    ))}
  </select>
);
