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

export default class extends React.Component<Props & *, *> {
  ref: ?ObjectElement;
  saveRef = (ref: *) => (this.ref = ref);
  updateAttributes() {
    if (!this.ref || !this.ref.contentDocument || !this.props.set) return false;
    const { contentDocument } = this.ref;

    for (let [selector, newFill] of this.props.set) {
      const target = contentDocument.querySelector(selector);

      if (target) {
        target.setAttribute("fill", newFill);
        target.setAttribute("style", "transition: 1s");
      } else return false;
    }

    return true;
  }
  // Polling for document ready. Until a way is found to be notified when the
  // document is ready, try until it succeeds once.
  pollForReady = () => {
    this.updateAttributes() || setTimeout(this.pollForReady, 10);
  };
  componentDidMount() {
    // Begin polling for document ready.
    this.pollForReady();
  }
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
