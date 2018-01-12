// @flow

import type {
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor
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

export type FirstDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SecondDigit = 0 | FirstDigit;
export type MultiplierExponent = SecondDigit | -3 | -2 | -1;

export const firstDigitFromColor = (color: FirstDigitColor): FirstDigit =>
  DIGIT_VALUES_BY_COLOR[color];

export const secondDigitFromColor = (color: SecondDigitColor): SecondDigit =>
  DIGIT_VALUES_BY_COLOR[color];

export const multiplierExponentFromColor = (
  color: MultiplierColor
): MultiplierExponent => DIGIT_VALUES_BY_COLOR[color];
