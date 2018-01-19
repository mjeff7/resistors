// @flow

type ExtractInputType = <T>((T) => *) => T;
type ExtractReturnType = <T>((*) => T) => T;

export const transformArgs = <T: $ReadOnlyArray<(*) => *>>(
  ...transformers: T
) => (toTransform: (...$TupleMap<T, ExtractReturnType>) => *) => (
  ...args: $TupleMap<T, ExtractInputType>
) =>
  toTransform(
    ...transformers.map((transformer, argumentIndex) =>
      transformer(args[argumentIndex])
    )
  );
