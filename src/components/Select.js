// @flow

import React from "react";

type Props<T> = {
  onChange: number => mixed,
  options: Array<T>,
  value?: number
};

export default ({ onChange, options, value }: Props<*>) => (
  <select onChange={e => onChange(e.target.value)} value={value}>
    {options.map((option, optionIndex) => (
      <option key={optionIndex} value={optionIndex}>
        {option}
      </option>
    ))}
  </select>
);
