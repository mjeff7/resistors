// @flow

import { compose, defaultProps, withProps, withStateHandlers } from "recompose";
import * as React from "react";

import {
  FIRST_DIGIT_COLORS,
  MULTIPLIER_COLORS,
  SECOND_DIGIT_COLORS,
  TOLERANCE_COLORS,
  type FirstDigitColor,
  type MultiplierColor,
  type SecondDigitColor,
  type ToleranceColor
} from "../calculator/colors";
import {
  type OhmValueCalculatorFromColors,
  attachToleranceBounds,
  calculateOhmValueFromColors
} from "../calculator/calculator";
import type { ToleranceValue } from "../calculator/values";
import Select from "./Select";

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

const GenericBandSelector = withProps(({ onSelectValue, values }) => ({
  onChange: onSelectValue,
  options: values
}))(Select);

type BandSelector<T> = React.ComponentType<BandSelectorProps<T>>;

const FirstBandSelector: BandSelector<FirstDigitColor> = withProps({
  values: FIRST_DIGIT_COLORS
})(GenericBandSelector);

const SecondBandSelector: BandSelector<SecondDigitColor> = withProps({
  values: SECOND_DIGIT_COLORS
})(GenericBandSelector);

const MultiplierBandSelector: BandSelector<MultiplierColor> = withProps({
  values: MULTIPLIER_COLORS
})(GenericBandSelector);

const ToleranceBandSelector: BandSelector<ToleranceColor> = withProps({
  values: TOLERANCE_COLORS
})(GenericBandSelector);

type DisplayProps = {
  resistance: number,
  tolerance: ToleranceValue,
  minimum: number,
  maximum: number
};

const DisplayComponent = ({
  resistance,
  tolerance,
  minimum,
  maximum
}: DisplayProps) => (
  <div>
    <FirstBandSelector value={"brown"} onSelectValue={() => {}} />
    <SecondBandSelector value={"brown"} onSelectValue={() => {}} />
    <MultiplierBandSelector value={"brown"} onSelectValue={() => {}} />
    <ToleranceBandSelector value={"none"} onSelectValue={() => {}} />
    <div>Resistance value: {resistance}</div>
    <div>Tolerance: {tolerance}</div>
    <div>Minimum: {minimum}</div>
    <div>Maximum: {maximum}</div>
  </div>
);

export const useCalculator = (calculator: OhmValueCalculatorFromColors) =>
  compose(
    withProps(({ bandAColor, bandBColor, bandCColor, bandDColor }) => {
      // Explicitly destructure and return these properties so that Flow sees
      // that they are present as component properties.
      const { resistance, tolerance } = calculator(
        bandAColor,
        bandBColor,
        bandCColor,
        bandDColor
      );

      return { resistance, tolerance };
    }),
    withProps(props => {
      const { minimum, maximum } = attachToleranceBounds(props);
      return { minimum, maximum };
    })
  );

export const attachStateHandlers = withStateHandlers(
  {
    bandAColor: "brown",
    bandBColor: "brown",
    bandCColor: "brown",
    bandDColor: "brown"
  },
  {
    setBandAColor: () => bandAColor => ({ bandAColor }),
    setBandBColor: () => bandBColor => ({ bandBColor }),
    setBandCColor: () => bandCColor => ({ bandCColor }),
    setBandDColor: () => bandDColor => ({ bandDColor })
  }
);

const enhancer = compose(
  defaultProps({
    bandAColor: "brown",
    bandBColor: "brown",
    bandCColor: "brown",
    bandDColor: "brown"
  }),
  useCalculator(calculateOhmValueFromColors)
);

export default enhancer(DisplayComponent);
