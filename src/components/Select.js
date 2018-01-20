// @flow

/*
 * Select
 *
 * A managed component that wraps select and option DOM elements. It is typed so
 * that the options given agree in type with the one chosen for display and the
 * callback for when the user selects an option.
 *
 * Styles can be provided on the menu and the options.
 */

import React from "react";

type Props<T> = {
  // Callback called when the user selects an option.
  onChange: T => mixed,

  // The options to present to the user.
  options: Array<T>,

  // The currently selected value. Optional. Passed directly to the underlying
  // DOM element.
  +value?: T,

  // Styles for the component. Keys correspond to the values provided in
  // options.  The values are objects passed as style objects to React. The
  // value for special key null is passed as the style of the select element
  // itself.
  +styles?: { [T | null]: ?{} }
};

export default <T: string>({
  onChange,
  options,
  value,
  styles = {}
}: Props<T>) => (
  <select
    onChange={e => onChange(e.target.value)}
    value={value}
    style={styles[null]}
  >
    {options.map((option, optionIndex) => (
      <option key={optionIndex} value={option} style={styles[option]}>
        {option}
      </option>
    ))}
  </select>
);
