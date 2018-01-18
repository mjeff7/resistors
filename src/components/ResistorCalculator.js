// @flow

import { compose, defaultProps, withProps, withStateHandlers } from "recompose";

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
import { abbreviateValue } from "../utils";
import ResistorCalculatorLayout from "./ResistorCalculatorLayout";

export type BandColors = {
  bandAColor: FirstDigitColor,
  bandBColor: SecondDigitColor,
  bandCColor: MultiplierColor,
  bandDColor: ToleranceColor
};

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

export const formatResistanceValue = (value: number) => {
  const [smallValue, suffix] = abbreviateValue(value);

  return `${smallValue} ${suffix}Ω`;
};

export const formatTolerance = (value: ToleranceValue) => `± ${value * 100}%`;

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

export default enhancer(ResistorCalculatorLayout);
