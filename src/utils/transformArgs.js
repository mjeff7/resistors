// @flow

/*
 * transformArgs
 *
 * Transforms a function taking one set of arguments into a function taking
 * another set of arguments by first applying the supplied set of transformers
 * to each argument. For example, create greetFriend from greet like so:
 *
 *    const greet = (greeting, title) => `${greeting} ${title}`;
 *
 *    const capitalize = str => str.toUpperCase();
 *    const chooseGreeting = isCloseFriend =>
 *      isCloseFriend ? "bud" : "friend";
 *    const greetFriend = transformArgs(capitalize, chooseGreeting)(greet);
 *
 *    greetFriend("Hey", true) === "HEY bud";
 */

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
