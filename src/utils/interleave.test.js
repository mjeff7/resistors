// @flow

import { interleave } from "./interleave";

it("interleaves two arrays", () => {
  expect(interleave([0], [1])).toEqual([0, 1]);
  expect(interleave([0, 2, 4], [1, 3, 5])).toEqual([0, 1, 2, 3, 4, 5]);
});

it("includes all elements of both arrays", () => {
  expect(interleave([0, 2], [1, 3, 5])).toEqual([0, 1, 2, 3, 5]);
  expect(interleave([0, 2, 4], [1, 3])).toEqual([0, 1, 2, 3, 4]);
});
