// @flow

export const interleave = (arrA: Array<*>, arrB: Array<*>): Array<*> => {
  const maxLength = Math.max(arrA.length, arrB.length);
  const resultArray = [];

  for (let elementIndex = 0; elementIndex < maxLength; elementIndex++) {
    if (arrA.length > elementIndex) resultArray.push(arrA[elementIndex]);
    if (arrB.length > elementIndex) resultArray.push(arrB[elementIndex]);
  }

  return resultArray;
};
