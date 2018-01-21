// @flow

/*
 * ResistorCalculator
 *
 * Provides the logic wiring the pieces of the calculator interface together
 * and passes them on to a display component.
 *
 */

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

/*
 * Types.
 */

// The part of state representing the current color selection.
export type BandColors = {
  bandAColor: FirstDigitColor,
  bandBColor: SecondDigitColor,
  bandCColor: MultiplierColor,
  bandDColor: ToleranceColor
};

/*
 * HOCs
 */

/*  Calculator HOC  */

// Takes the calculator to use and returns an HOC that translates color bands
// provided on props into resistor specs it provides on props.
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

/*  State HOC   */

// An HOC that provides BandColors as state and setBandAColor, setBandBColor,
// etc. as setters for that state.
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

/*  Formatting HOC  */

export const formatResistanceValue = (value: number, sigFigs: ?number) => {
  const [smallValue, suffix] = abbreviateValue(value);

  // Chop off any rounding errors that result in long decimal runs.
  const clippedValue = Math.round(smallValue * 1e8) / 1e8;

  return `${
    sigFigs ? clippedValue.toPrecision(sigFigs) : clippedValue
  } ${suffix}Ω`;
};

export const formatTolerance = (value: ToleranceValue) => `± ${value * 100}%`;

const getSigFigsForRangeBounds = (tolerance: ToleranceValue) =>
  2 - Math.floor(Math.log10(tolerance));

// HOC that formats resistor specs from numerical values to more human readable
// strings. They are provided in the props under the same names; e.g. it takes
// props.resistance as a number and passes on props.resistance as a formatted
// string.
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

/*  Combined component  */

// HOC that collects the effects of the above HOCs.
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
