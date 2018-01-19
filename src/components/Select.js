// @flow

import React from "react";

type Props<T> = {
  onChange: T => mixed,
  options: Array<T>,
  +value?: T,
  +styles?: { [T]: ?{} }
};

export default <T: string>({
  onChange,
  options,
  value,
  styles = {}
}: Props<T>) => (
  <select onChange={e => onChange(e.target.value)} value={value}>
    {options.map((option, optionIndex) => (
      <option
        key={optionIndex}
        value={option}
        label={option}
        style={styles[option]}
      />
    ))}
  </select>
);
