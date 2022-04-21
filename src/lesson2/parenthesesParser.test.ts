import { parenthesesParser, ParsedParenthesesType } from "./parenthesesParser";

describe("Parentheses Parser correct cases", () => {
  it("(1 + 32)", () => {
    expect(parenthesesParser("(1 + 32)")).toEqual([
      { start: 0, end: 7, level: 1 },
    ] as ParsedParenthesesType[]);
  });

  it("11 + 3 * 22", () => {
    expect(parenthesesParser("11 + 3 * 22")).toEqual([]);
  });

  it("2 * (5 * (11 + 3) * 22 + 6)", () => {
    expect(parenthesesParser("2 * (5 * (11 + 3) * 22 + 6)")).toEqual([
      { start: 4, end: 26, level: 1 },
      { start: 9, end: 16, level: 2 },
    ] as ParsedParenthesesType[]);
  });
});

describe("Parentheses Parser invalid cases", () => {
  it("2 * (5 * (11 + 3) * 22 + 6", () => {
    expect(() => parenthesesParser("2 * (5 * (11 + 3) * 22 + 6")).toThrow(
      TypeError("Unexpected parentheses!")
    );
  });

  it("2 * )5 * (11 + 3) * 22 + 6)", () => {
    expect(() => parenthesesParser("2 * (5 * (11 + 3) * 22 + 6")).toThrow(
      TypeError("Unexpected parentheses!")
    );
  });
});
