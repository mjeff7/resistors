// @flow

import React from "react";
import {
  FIRST_DIGIT_COLORS,
  SECOND_DIGIT_COLORS,
  MULTIPLIER_COLORS,
  TOLERANCE_COLORS
} from "../calculator/colors";

import type {
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
} from "../calculator/colors";

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

type GenericBandSelectorProps<T> = BandSelectorProps<T> & {
  values: Array<T>
};

const GenericBandSelector = <T>({
  value,
  values,
  onSelectValue
}: GenericBandSelectorProps<T>) => <div />;

type FirstBandSelectorProps = BandSelectorProps<FirstDigitColor>;

const FirstBandSelector = ({
  value,
  onSelectValue
}: FirstBandSelectorProps) => (
  <GenericBandSelector
    value={value}
    onSelectValue={onSelectValue}
    values={FIRST_DIGIT_COLORS}
  />
);

type SecondBandSelectorProps = BandSelectorProps<SecondDigitColor>;

const SecondBandSelector = ({
  value,
  onSelectValue
}: SecondBandSelectorProps) => (
  <GenericBandSelector
    value={value}
    onSelectValue={onSelectValue}
    values={SECOND_DIGIT_COLORS}
  />
);

type MultiplierBandSelectorProps = BandSelectorProps<MultiplierColor>;

const MultiplierBandSelector = ({
  value,
  onSelectValue
}: MultiplierBandSelectorProps) => (
  <GenericBandSelector
    value={value}
    onSelectValue={onSelectValue}
    values={MULTIPLIER_COLORS}
  />
);

type ToleranceBandSelectorProps = BandSelectorProps<ToleranceColor>;

const ToleranceBandSelector = ({
  value,
  onSelectValue
}: ToleranceBandSelectorProps) => (
  <GenericBandSelector
    value={value}
    onSelectValue={onSelectValue}
    values={TOLERANCE_COLORS}
  />
);

export default () => (
  <div>
    <FirstBandSelector value={"brown"} onSelectValue={() => {}} />
    <SecondBandSelector value={"brown"} onSelectValue={() => {}} />
    <MultiplierBandSelector value={"brown"} onSelectValue={() => {}} />
    <ToleranceBandSelector value={"none"} onSelectValue={() => {}} />
  </div>
);
