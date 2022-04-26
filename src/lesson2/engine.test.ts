import { getLevels, calcByPriorityLevel } from "./engine";
import { parser } from "./parser";

describe.each([
  ["5 * 3 + 10 * 3 ** + 3 !", [1, 2, 3]],
  ["5 - 7 + 3 * 10 + 8", [2, 3]],
  ["5 + 10 - 6", [3]],
  ["7 * 8 * 9", [2]],
])("getLevels(%s) simple cases", (line, expected) => {
  test(`returns ${expected}`, () => {
    expect(getLevels(parser(line)).sort()).toEqual(expected.sort());
  });
});

describe.each([[[5, 3]], [[3, 7, 9]]])(
  "getLevels(%s) invalid cases",
  (stack) => {
    test(`Throw Unexpected stack!`, () => {
      expect(() => getLevels(stack)).toThrow(TypeError("Unexpected stack!"));
    });
  }
);

describe.each([
  ["1 * 32", 2, [32]],
  ["32 / 32", 2, [1]],
  ["4 **", 1, [16]],
  ["4 ^ 3", 1, [64]],
  ["5 !", 1, [120]],
  ["32 + 32", 2, parser("32 + 32")],
])("calcByPriorityLevel simple cases(%s, %i)", (line, level, expected) => {
  test(`returns ${expected}`, () => {
    expect(calcByPriorityLevel(parser(line), level)).toEqual(expected);
  });
});

describe.each([
  ["5 * 3 + 10 * 3 ** + 3 !", 1, parser("5 * 3 + 10 * 9 + 6")],
  ["7 - 8 * 8 + 5 * 3", 2, parser("7 - 64 + 15")],
])(
  "calcByPriorityLevel(%s, %i) mixed levels cases",
  (line, level, expected) => {
    test(`returns ${expected}`, () => {
      expect(calcByPriorityLevel(parser(line), level)).toEqual(expected);
    });
  }
);

describe("calcByPriorityLevel invalid cases", () => {
  it("32 / 32 + 5", () => {
    expect(() => calcByPriorityLevel(parser("32 / 32 + 5"), 3)).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});
