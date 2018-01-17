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
import type {
  FirstDigitColor,
  MultiplierColor,
  SecondDigitColor,
  ToleranceColor
} from "./colors";
import { transformArgs } from "../utils";

export const calculateOhmCenterValue = (
  bandA: FirstDigit,
  bandB: SecondDigit,
  multiplierExponent: MultiplierExponent
) => (bandA * 10 + bandB) * Math.pow(10, multiplierExponent);

export type CalculatedOhmValue = {
  resistance: number,
  tolerance: ToleranceValue
};

export type OhmValueCalculator = (
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
) => CalculatedOhmValue;

export type OhmValueCalculatorFromColors = (
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
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

export const attachToleranceBounds = ({
  resistance,
  tolerance
}: CalculatedOhmValue): CalculatedOhmValue & {
  minimum: number,
  maximum: number
} => ({
  resistance,
  tolerance,
  minimum: resistance * (1 - tolerance),
  maximum: resistance * (1 + tolerance)
});

export const wrapOhmValueCalculator = transformArgs(
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
);

export const calculateOhmValueFromColors: (
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
) => CalculatedOhmValue = wrapOhmValueCalculator(calculateOhmValue);
