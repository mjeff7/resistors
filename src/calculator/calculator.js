// @flow

import {
  type FirstDigit,
  type SecondDigit,
  type MultiplierExponent,
  type ToleranceValue,
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
} from "./values";
import { transformArgs } from "../utils";

export const calculateOhmCenterValue = (
  bandA: FirstDigit,
  bandB: SecondDigit,
  multiplierExponent: MultiplierExponent
) => (bandA * 10 + bandB) * Math.pow(10, multiplierExponent);

type CalculatedOhmValue = {
  resistance: number,
  tolerance: ToleranceValue
};

type OhmValueCalculator = (
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
) => CalculatedOhmValue;

export const calculateOhmValue: OhmValueCalculator = (
  bandA,
  bandB,
  multiplierExponent,
  tolerance
) => ({
  resistance: calculateOhmCenterValue(bandA, bandB, multiplierExponent),
  tolerance
});

export const wrapOhmValueCalculator = transformArgs(
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
);
