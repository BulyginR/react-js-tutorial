import {
  factorial,
  getOperatorTypeAndFunctionFromFunction,
  mathOperators,
  MathOperatorType,
  mul,
  OperatorType,
  UnaryOperationType,
} from "./mathOperators";

describe.each([
  [1, 2, "*", 2],
  [2, 2, "*", 4],
  [2, 2, "/", 1],
  [4, 2, "/", 2],
  [4, 2, "+", 6],
  [4, 2, "-", 2],
  [3, 3, "^", 27],
] as [number, number, string, number][])(
  "mathOperators ScalarOperationType: (%i, %i) - %s test cases",
  (arg1, arg2, operator, expected) => {
    test(`returns ${expected}`, () => {
      expect(mathOperators[operator].function(arg1, arg2)).toEqual(expected);
    });
  }
);

describe.each([
  [6, "**", 36],
  [5, "!", 120],
] as [number, string, number][])(
  "mathOperators UnaryOperationType: (%i) - %s test cases",
  (arg1, operator, expected) => {
    test(`returns ${expected}`, () => {
      expect(
        (mathOperators[operator].function as UnaryOperationType)(arg1)
      ).toEqual(expected);
    });
  }
);

describe("getOperatorTypeAndFunctionFromFunction test cases", () => {
  it("mul is Binary", () => {
    expect(getOperatorTypeAndFunctionFromFunction(mul)).toEqual({
      operatorType: OperatorType.Binary,
      function: mul,
    } as Pick<MathOperatorType, "operatorType" | "function">);
  });

  it("factorial is Unary", () => {
    expect(getOperatorTypeAndFunctionFromFunction(factorial)).toEqual({
      operatorType: OperatorType.Unary,
      function: factorial,
    } as Pick<MathOperatorType, "operatorType" | "function">);
  });
});
