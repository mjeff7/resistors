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

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

const GenericBandSelector = withProps(({ onSelectValue, values }) => ({
  onChange: onSelectValue,
  options: values,
  styles: {}
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
