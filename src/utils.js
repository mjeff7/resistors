export const transformArgs = (...transformers) => toTransform => (...args) => {
  const transformedArgs = transformers.map((transformer, argumentIndex) =>
    transformer(args[argumentIndex])
  );

  return toTransform(...transformedArgs);
};
