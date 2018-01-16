// @flow

import React from "react";

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

type FirstBandSelectorProps = BandSelectorProps<FirstDigitColor>;

const FirstBandSelector = ({
  value,
  onSelectValue
}: FirstBandSelectorProps) => <div />;

type SecondBandSelectorProps = BandSelectorProps<SecondDigitColor>;

const SecondBandSelector = ({
  value,
  onSelectValue
}: SecondBandSelectorProps) => <div />;

type MultiplierBandSelectorProps = BandSelectorProps<MultiplierColor>;

const MultiplierBandSelector = ({
  value,
  onSelectValue
}: MultiplierBandSelectorProps) => <div />;

type ToleranceBandSelectorProps = BandSelectorProps<ToleranceColor>;

const ToleranceBandSelector = ({
  value,
  onSelectValue
}: ToleranceBandSelectorProps) => <div />;

export default () => (
  <div>
    <FirstBandSelector value={"brown"} onSelectValue={() => {}} />
    <SecondBandSelector value={"brown"} onSelectValue={() => {}} />
    <MultiplierBandSelector value={"brown"} onSelectValue={() => {}} />
    <ToleranceBandSelector value={"none"} onSelectValue={() => {}} />
  </div>
);
