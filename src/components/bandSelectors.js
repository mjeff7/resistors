// @flow

/*
 * bandSelectors
 *
 * Provides the selectors for each color band on a resistor. Each is typed
 * according to the values allowed for a given band and wraps a presentation
 * component for the interface.
 *
 */

import { withProps } from "recompose";
import * as React from "react";

import {
  FIRST_DIGIT_COLORS,
  type FirstDigitColor,
  MULTIPLIER_COLORS,
  type MultiplierColor,
  SECOND_DIGIT_COLORS,
  type SecondDigitColor,
  TOLERANCE_COLORS,
  type ToleranceColor
} from "../calculator/colors";
import COLOR_REPRESENTATIVES from "../colorRepresentatives";
import Select from "./Select";

/*
 * Styling.
 */

// Background display color for each color.
const MENU_BACKGROUND_COLORS = COLOR_REPRESENTATIVES;

// Text display color for each color.
const MENU_TEXT_COLORS = {
  none: "black",
  pink: "black",
  silver: "black",
  gold: "black",
  black: "white",
  brown: "white",
  red: "black",
  orange: "black",
  yellow: "black",
  green: "white",
  blue: "white",
  violet: "black",
  grey: "white",
  white: "black"
};

// A style object that combines the above styling options to be given to React.
const MENU_STYLES = Object.assign(
  {},
  ...Object.keys(MENU_BACKGROUND_COLORS).map(color => ({
    [color]: {
      color: MENU_TEXT_COLORS[color],
      background: MENU_BACKGROUND_COLORS[color]
    }
  }))
);

/*
 * *BandSelector components.
 *
 * They each take two props specifying the chosen value to display and a
 * callback when a new value is chosen. Each band selector provides the allowed
 * colors for that band and the props are typed against those colors.
 */

type BandSelectorProps<T> = {
  // Callback that will be triggered when the user selects an option.
  onSelectValue: T => void,

  // The value to display currently.
  value: T
};

type BandSelector<T> = React.ComponentType<BandSelectorProps<T>>;

const GenericBandSelector = withProps(({ onSelectValue, value, values }) => ({
  onChange: onSelectValue,
  options: values,
  styles: { ...MENU_STYLES, null: MENU_STYLES[value] }
}))(Select);

export const FirstBandSelector: BandSelector<FirstDigitColor> = withProps({
  values: FIRST_DIGIT_COLORS
})(GenericBandSelector);

export const SecondBandSelector: BandSelector<SecondDigitColor> = withProps({
  values: SECOND_DIGIT_COLORS
})(GenericBandSelector);

export const MultiplierBandSelector: BandSelector<MultiplierColor> = withProps({
  values: MULTIPLIER_COLORS
})(GenericBandSelector);

export const ToleranceBandSelector: BandSelector<ToleranceColor> = withProps({
  values: TOLERANCE_COLORS
})(GenericBandSelector);
