import { transformArgs } from "./utils";

describe("transformArgs", () => {
  it("transforms the arguments with the functions given", () => {
    const target = jest.fn();
    const wrapper = transformArgs(x => x + 1)(target);

    wrapper("hello");
    expect(target).lastCalledWith("hello1");

    wrapper(10);
    expect(target).lastCalledWith(11);

    expect(target).toHaveBeenCalledTimes(2);
  });

  it("transforms multiple arguments with the functions given", () => {
    const target = jest.fn();
    const wrapper = transformArgs(() => {}, () => {}, () => {}, x => x.length)(
      target
    );

    wrapper(null, null, null, "hello");
    expect(target).lastCalledWith(undefined, undefined, undefined, 5);

    expect(target).toHaveBeenCalledTimes(1);
  });

  it("returns the value returned by the wrapped function", () => {
    const target = jest.fn(() => "correct");
    const wrapper = transformArgs(x => x, x => x)(target);

    expect(wrapper(0, "success: ")).toBe("correct");
  });
});
