// @flow

import * as React from "react";

type Selector = string;
type Value = string;

type Setters = Array<[Selector, Value]>;

type ObjectElement = HTMLElement & { contentDocument?: Document };

type Props = {
  // aria is explicitly passed here to pacify the linter, which does not catch
  // that it is included in props spread.
  ariaLabel: string,
  set?: Setters
};

const pollWhileFalsy = f =>
  new Promise((resolve, reject) => {
    const attempt = () => {
      const result = f();

      if (result) resolve(result);
      else setTimeout(attempt, 10);
    };

    attempt();
  });

export default class extends React.Component<Props & *, *> {
  contentDocument: ?Document;

  saveRef = (ref: ?ObjectElement): Promise<*> =>
    pollWhileFalsy(() => {
      if (!ref) return;

      this.contentDocument = ref.contentDocument;

      return (
        this.contentDocument &&
        this.contentDocument.querySelector(this.props.set[0][0])
      );
    }).then(this.updateAttributes);

  updateAttributes = () => {
    if (!this.contentDocument || !this.props.set) return;

    for (let [selector, newFill] of this.props.set) {
      const target = this.contentDocument.querySelector(selector);

      if (target) {
        target.setAttribute("fill", newFill);
        target.setAttribute("style", "transition: 1s");
      }
    }
  };

  componentDidUpdate() {
    this.updateAttributes();
  }

  render() {
    const { set, ariaLabel, ...remainingProps } = this.props;

    return (
      <object ref={this.saveRef} aria-label={ariaLabel} {...remainingProps} />
    );
  }
}
