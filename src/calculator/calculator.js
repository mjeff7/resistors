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

type OhmValueCalculator = (
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
) => number;

export const wrapOhmValueCalculator = transformArgs(
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
);
