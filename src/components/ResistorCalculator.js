// @flow

import {
  compose,
  defaultProps,
  withProps,
  withStateHandlers,
  type HOC
} from "recompose";

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

export const useCalculator = (
  calculator: OhmValueCalculatorFromColors
): HOC<*, *> =>
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

export const formatResistanceValue = (value: number, sigFigs: ?number) => {
  const [smallValue, suffix] = abbreviateValue(value);

  return `${sigFigs ? smallValue.toPrecision(sigFigs) : smallValue} ${suffix}Ω`;
};

export const formatTolerance = (value: ToleranceValue) => `± ${value * 100}%`;

const getSigFigsForRangeBounds = (tolerance: ToleranceValue) =>
  2 - Math.floor(Math.log10(tolerance));

const formatValuesForDisplay = withProps(
  ({ resistance, minimum, maximum, tolerance }) => {
    const boundsSigFigs = getSigFigsForRangeBounds(tolerance);

    return {
      resistance: formatResistanceValue(resistance),
      minimum: formatResistanceValue(minimum, boundsSigFigs),
      maximum: formatResistanceValue(maximum, boundsSigFigs),
      tolerance: formatTolerance(tolerance)
    };
  }
);

const enhancer = compose(
  defaultProps({
    bandAColor: FIRST_DIGIT_COLORS[0],
    bandBColor: SECOND_DIGIT_COLORS[0],
    bandCColor: MULTIPLIER_COLORS[0],
    bandDColor: TOLERANCE_COLORS[0]
  }),
  attachStateHandlers,
  useCalculator(calculateOhmValueFromColors),
  formatValuesForDisplay
);

export default enhancer(ResistorCalculatorLayout);
