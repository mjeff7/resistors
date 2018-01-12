// @flow

import type { SecondDigitColor, MultiplierColor } from "./colors";
import { Colors } from "./colors";

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const DIGIT_VALUES_BY_COLOR: { [SecondDigitColor]: Digit } = {
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

export type MultiplierExponent = Digit | -3 | -2 | -1;

export const MULTIPLIER_EXPONENT_BY_COLOR: {
  [MultiplierColor]: MultiplierExponent
} = {
  ...DIGIT_VALUES_BY_COLOR,
  [Colors.PINK]: -3,
  [Colors.SILVER]: -2,
  [Colors.GOLD]: -1
};
