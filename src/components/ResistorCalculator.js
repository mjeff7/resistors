// @flow

import * as React from "react";
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
}: GenericBandSelectorProps<T>): React.Node => <div />;

type FirstBandSelectorProps = BandSelectorProps<FirstDigitColor>;

const FirstBandSelector = ({
  value,
  onSelectValue
}: FirstBandSelectorProps): React.Node => (
  <GenericBandSelector
    value={value}
    values={FIRST_DIGIT_COLORS}
    onSelectValue={onSelectValue}
  />
);

type SecondBandSelectorProps = BandSelectorProps<SecondDigitColor>;

const SecondBandSelector = ({
  value,
  onSelectValue
}: SecondBandSelectorProps): React.Node => (
  <GenericBandSelector
    value={value}
    values={SECOND_DIGIT_COLORS}
    onSelectValue={onSelectValue}
  />
);

type MultiplierBandSelectorProps = BandSelectorProps<MultiplierColor>;

const MultiplierBandSelector = ({
  value,
  onSelectValue
}: MultiplierBandSelectorProps): React.Node => (
  <GenericBandSelector
    value={value}
    values={MULTIPLIER_COLORS}
    onSelectValue={onSelectValue}
  />
);

type ToleranceBandSelectorProps = BandSelectorProps<ToleranceColor>;

const ToleranceBandSelector = ({
  value,
  onSelectValue
}: ToleranceBandSelectorProps): React.Node => (
  <GenericBandSelector
    value={value}
    values={TOLERANCE_COLORS}
    onSelectValue={onSelectValue}
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
