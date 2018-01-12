// @flow

import React from "react";

type Props = {
  onChange: number => mixed,
  options: Array<string | number>,
  value?: number
};

export default ({ onChange, options, value }: Props) => (
  <select onChange={e => onChange(e.target.value)} value={value}>
    {options.map((option, optionIndex) => (
      <option key={optionIndex} value={optionIndex}>
        {option}
      </option>
    ))}
  </select>
);
