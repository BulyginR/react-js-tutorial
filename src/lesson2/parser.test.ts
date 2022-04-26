import { parser } from "./parser";
import { mathOperators } from "./mathOperators";

describe.each([
  ["1 * 32", [1, mathOperators["*"], 32]],
  ["1 + 32", [1, mathOperators["+"], 32]],
  ["11 + 3 * 22", [11, mathOperators["+"], 3, mathOperators["*"], 22]],
  [
    "1 + 32 - 2 + 2",
    [1, mathOperators["+"], 32, mathOperators["-"], 2, mathOperators["+"], 2],
  ],
  [
    "1 + 32 - 2 ** + 2 - 6 !",
    [
      1,
      mathOperators["+"],
      32,
      mathOperators["-"],
      2,
      mathOperators["**"],
      mathOperators["+"],
      2,
      mathOperators["-"],
      6,
      mathOperators["!"],
    ],
  ],
  [
    "4 ** ** ! + 4",
    [
      4,
      mathOperators["**"],
      mathOperators["**"],
      mathOperators["!"],
      mathOperators["+"],
      4,
    ],
  ],
])("Parser(%s) correct cases", (line, expected) => {
  test(`returns ${expected}`, () => {
    expect(parser(line)).toEqual(expected);
  });
});

describe.each([["1 + + 33 - 2"], ["1 ! 33 - 2"], ["1 + 33 - 2 ** +"]])(
  "Parser(%s) invalid cases",
  (line) => {
    test(`Throw Unexpected string"`, () => {
      expect(() => parser(line)).toThrow(TypeError("Unexpected string"));
    });
  }
);
