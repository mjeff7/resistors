// @flow

import type {
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
} from "./colors";
import { Colors } from "./colors";

const DIGIT_VALUES_BY_COLOR = {
  [Colors.PINK]: -3,
  [Colors.SILVER]: -2,
  [Colors.GOLD]: -1,
  [Colors.BLACK]: 0,
  [Colors.BROWN]: 1,
  [Colors.RED]: 2,
  [Colors.ORANGE]: 3,
  [Colors.YELLOW]: 4,
  [Colors.GREEN]: 5,
  [Colors.BLUE]: 6,
  [Colors.VIOLET]: 7,
  [Colors.GREY]: 8,
  [Colors.WHITE]: 9
};

const TOLERANCE_VALUES_BY_COLOR = {
  [Colors.NONE]: 0.2,
  [Colors.SILVER]: 0.1,
  [Colors.GOLD]: 0.05,
  [Colors.BROWN]: 0.01,
  [Colors.RED]: 0.02,
  [Colors.GREEN]: 0.005,
  [Colors.BLUE]: 0.0025,
  [Colors.VIOLET]: 0.001,
  [Colors.GREY]: 0.0005
};

export type FirstDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SecondDigit = 0 | FirstDigit;
export type MultiplierExponent = SecondDigit | -3 | -2 | -1;
export type ToleranceValue =
  | 0.2
  | 0.1
  | 0.05
  | 0.01
  | 0.02
  | 0.005
  | 0.0025
  | 0.001
  | 0.0005;

const lookupColorDigit = <T: string>(color: T) => DIGIT_VALUES_BY_COLOR[color];

export const firstDigitFromColor: (
  color: FirstDigitColor
) => FirstDigit = lookupColorDigit;

export const secondDigitFromColor: (
  color: SecondDigitColor
) => SecondDigit = lookupColorDigit;

export const multiplierExponentFromColor: (
  color: MultiplierColor
) => MultiplierExponent = lookupColorDigit;

export const toleranceValueFromColor = (
  color: ToleranceColor
): ToleranceValue => TOLERANCE_VALUES_BY_COLOR[color];
