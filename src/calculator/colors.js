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

export type FirstDigitColor =
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "grey"
  | "white";

export const FIRST_DIGIT_COLORS: Array<FirstDigitColor> = [
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

export type SecondDigitColor = "black" | FirstDigitColor;

export const SECOND_DIGIT_COLORS: Array<SecondDigitColor> = ["black"].concat(
  FIRST_DIGIT_COLORS
);

/*
 * Colors that represent the multiplier, i.e. the third band.
 */

export type MultiplierColor =
  | "pink"
  | "silver"
  | "gold"
  | "black"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "grey"
  | "white";

export const MULTIPLIER_COLORS: Array<MultiplierColor> = [
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

/*
 * Colors that represent the tolerance, i.e. the fourth band.
 */

export type ToleranceColor =
  | "none"
  | "silver"
  | "gold"
  | "brown"
  | "red"
  | "green"
  | "blue"
  | "violet"
  | "grey";

export const TOLERANCE_COLORS: Array<ToleranceColor> = [
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
