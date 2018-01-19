// @flow

/*
 * Enumerate the colors used as bands on resistors. Colors can be imported
 * as an object with
 *
 *    import { Colors } from './colors';
 *
 * which are objects with the color constants as keys.
 *
 * Each band has a set of valid colors, and those are included here as types.
 *   1. FirstDigitColor: Colors representing digits, valid on the first band.
 *   2. SecondDigitColor: Colors representing digits, valid on the second band
 *      (same as FirstDigitColor but includes black).
 *   3. MultiplierColor: Colors representing multiplier exponents, valid on the
 *      third band.
 *   4. ToleranceColor: Colors representing the tolerance, valid on the fourth
 *      band.
 *
 */

/*
 * Colors that are valid as digits, i.e. the first two bands.
 */

export const FIRST_DIGIT_COLORS = [
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

export type FirstDigitColor = $ElementType<typeof FIRST_DIGIT_COLORS, number>;

export const SECOND_DIGIT_COLORS = ["black"].concat(FIRST_DIGIT_COLORS);

export type SecondDigitColor = $ElementType<typeof SECOND_DIGIT_COLORS, number>;

/*
 * Colors that represent the multiplier, i.e. the third band.
 */

export const MULTIPLIER_COLORS = [
  "pink",
  "silver",
  "gold",
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

export type MultiplierColor = $ElementType<typeof MULTIPLIER_COLORS, number>;

/*
 * Colors that represent the tolerance, i.e. the fourth band.
 */

export const TOLERANCE_COLORS = [
  "none",
  "silver",
  "gold",
  "brown",
  "red",
  "green",
  "blue",
  "violet",
  "grey"
];

export type ToleranceColor = $ElementType<typeof TOLERANCE_COLORS, number>;

/*
 * All colors
 */

export type Color =
  | FirstDigitColor
  | SecondDigitColor
  | MultiplierColor
  | ToleranceColor;

export const Colors = {
  NONE: "none",
  PINK: "pink",
  SILVER: "silver",
  GOLD: "gold",
  BLACK: "black",
  BROWN: "brown",
  RED: "red",
  ORANGE: "orange",
  YELLOW: "yellow",
  GREEN: "green",
  BLUE: "blue",
  VIOLET: "violet",
  GREY: "grey",
  WHITE: "white"
};
