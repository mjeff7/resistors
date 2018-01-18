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

export type BandColors = {
  bandAColor: FirstDigitColor,
  bandBColor: SecondDigitColor,
  bandCColor: MultiplierColor,
  bandDColor: ToleranceColor
};

type DisplayProps = BandColors & {
  resistance: number,
  tolerance: ToleranceValue,
  minimum: number,
  maximum: number,
  setBandAColor: (*) => *,
  setBandBColor: (*) => *,
  setBandCColor: (*) => *,
  setBandDColor: (*) => *
};

export const DisplayComponent = ({
  resistance,
  tolerance,
  minimum,
  maximum,
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor,
  setBandAColor,
  setBandBColor,
  setBandCColor,
  setBandDColor
}: DisplayProps) => (
  <div>
    <FirstBandSelector value={bandAColor} onSelectValue={setBandAColor} />
    <SecondBandSelector value={bandBColor} onSelectValue={setBandBColor} />
    <MultiplierBandSelector value={bandCColor} onSelectValue={setBandCColor} />
    <ToleranceBandSelector value={bandDColor} onSelectValue={setBandDColor} />
    <div>Resistance value: {resistance}</div>
    <div>Tolerance: {tolerance}</div>
    <div>Minimum: {minimum}</div>
    <div>Maximum: {maximum}</div>
  </div>
);

export const useCalculator = (calculator: OhmValueCalculatorFromColors) =>
  compose(
    withProps(
      ({ bandAColor, bandBColor, bandCColor, bandDColor }: BandColors) => {
        // Explicitly destructure and return these properties so that Flow sees
        // that they are present as component properties.
        const { resistance, tolerance } = calculator(
          bandAColor,
          bandBColor,
          bandCColor,
          bandDColor
        );

        return { resistance, tolerance };
      }
    ),
    withProps((props: { resistance: number, tolerance: ToleranceValue }) => {
      const { minimum, maximum } = attachToleranceBounds(props);
      return { minimum, maximum };
    })
  );

export const attachStateHandlers = compose(
  withStateHandlers(({ bandAColor }) => ({ bandAColor }), {
    setBandAColor: () => (bandAColor: FirstDigitColor) => ({ bandAColor })
  }),
  withStateHandlers(({ bandBColor }) => ({ bandBColor }), {
    setBandBColor: () => (bandBColor: SecondDigitColor) => ({ bandBColor })
  }),
  withStateHandlers(({ bandCColor }) => ({ bandCColor }), {
    setBandCColor: () => (bandCColor: MultiplierColor) => ({ bandCColor })
  }),
  withStateHandlers(({ bandDColor }) => ({ bandDColor }), {
    setBandDColor: () => (bandDColor: ToleranceColor) => ({ bandDColor })
  })
);

const enhancer = compose(
  defaultProps({
    bandAColor: FIRST_DIGIT_COLORS[0],
    bandBColor: SECOND_DIGIT_COLORS[0],
    bandCColor: MULTIPLIER_COLORS[0],
    bandDColor: TOLERANCE_COLORS[0]
  }),
  attachStateHandlers,
  useCalculator(calculateOhmValueFromColors)
);

export default enhancer(DisplayComponent);
