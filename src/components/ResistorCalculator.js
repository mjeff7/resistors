// @flow

import * as React from "react";

import {
  FIRST_DIGIT_COLORS,
  MULTIPLIER_COLORS,
  SECOND_DIGIT_COLORS,
  TOLERANCE_COLORS,
  type FirstDigitColor,
  type MultiplierColor,
  type SecondDigitColor,
  type ToleranceColor
} from "../calculator/colors";
import Select from "./Select";

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

type GenericBandSelectorProps<T> = BandSelectorProps<T> & {
  values: Array<T>
};

const GenericBandSelector: React.ComponentType<*> = <T: string>({
  value,
  values,
  onSelectValue
}: GenericBandSelectorProps<T>): React.Node => (
  <Select
    options={values}
    onChange={colorIndex => onSelectValue(values[colorIndex])}
  />
);

type FirstBandSelectorProps = BandSelectorProps<FirstDigitColor>;

const FirstBandSelector: React.ComponentType<FirstBandSelectorProps> = ({
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

const SecondBandSelector: React.ComponentType<SecondBandSelectorProps> = ({
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

const MultiplierBandSelector: React.ComponentType<
  MultiplierBandSelectorProps
> = ({ value, onSelectValue }: MultiplierBandSelectorProps): React.Node => (
  <GenericBandSelector
    value={value}
    values={MULTIPLIER_COLORS}
    onSelectValue={onSelectValue}
  />
);

type ToleranceBandSelectorProps = BandSelectorProps<ToleranceColor>;

const ToleranceBandSelector: React.ComponentType<
  ToleranceBandSelectorProps
> = ({ value, onSelectValue }: ToleranceBandSelectorProps): React.Node => (
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
