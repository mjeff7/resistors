// @flow

import React from "react";

type Props<T> = {
  onChange: T => mixed,
  options: Array<T>,
  value?: T
};

export default ({ onChange, options, value }: Props<*>) => (
  <select onChange={e => onChange(e.target.value)} value={value}>
    {options.map((option, optionIndex) => (
      <option key={optionIndex} value={option}>
        {option}
      </option>
    ))}
  </select>
);
