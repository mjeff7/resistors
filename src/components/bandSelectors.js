// @flow

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
import Select from "./Select";

const MENU_BACKGROUND_COLORS = {
  none: "white",
  pink: "pink",
  silver: "silver",
  gold: "gold",
  black: "black",
  brown: "brown",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  violet: "violet",
  grey: "grey",
  white: "white"
};

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

const MENU_STYLES = Object.assign(
  {},
  ...Object.keys(MENU_BACKGROUND_COLORS).map(color => ({
    [color]: {
      color: MENU_TEXT_COLORS[color],
      background: MENU_BACKGROUND_COLORS[color]
    }
  }))
);

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

const GenericBandSelector = withProps(({ onSelectValue, value, values }) => ({
  onChange: onSelectValue,
  options: values,
  styles: { ...MENU_STYLES, null: MENU_STYLES[value] }
}))(Select);

type BandSelector<T> = React.ComponentType<BandSelectorProps<T>>;

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
