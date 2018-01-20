// @flow

/*
 * interleave
 *
 * Interleaves two arrays and includes all elements in both arrays, even if
 * one is shorter. For example,
 *
 *    interleave([0, 2, 4], [1, 3, 5, 7]) === [0, 1, 2, 3, 4, 5, 7]
 */

export const interleave = (arrA: Array<*>, arrB: Array<*>): Array<*> => {
  const maxLength = Math.max(arrA.length, arrB.length);
  const resultArray = [];

  for (let elementIndex = 0; elementIndex < maxLength; elementIndex++) {
    if (arrA.length > elementIndex) resultArray.push(arrA[elementIndex]);
    if (arrB.length > elementIndex) resultArray.push(arrB[elementIndex]);
  }

  return resultArray;
};
