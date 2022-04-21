import { parser } from "./parser";
import { mathOperators } from "./mathOperators";

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, mathOperators["+"], 32]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([
      11,
      mathOperators["+"],
      3,
      mathOperators["*"],
      22,
    ]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([
      1,
      mathOperators["+"],
      32,
      mathOperators["-"],
      2,
      mathOperators["+"],
      2,
    ]);
  });

  it("1 + 32 - 2 ** + 2 - 6 !", () => {
    expect(parser("1 + 32 - 2 ** + 2 - 6 !")).toEqual([
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
    ]);
  });

  it("4 ** ** ! + 4", () => {
    expect(parser("4 ** ** ! + 4")).toEqual([
      4,
      mathOperators["**"],
      mathOperators["**"],
      mathOperators["!"],
      mathOperators["+"],
      4,
    ]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });

  it("1 + 33 - 2 ** +", () => {
    expect(() => parser("1 + 33 - 2 ** +")).toThrow(
      TypeError("Unexpected string")
    );
  });
});
