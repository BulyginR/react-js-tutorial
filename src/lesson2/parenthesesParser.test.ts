import { parenthesesParser, ParsedParenthesesType } from "./parenthesesParser";

describe.each([
  ["(1 + 32)", [{ start: 0, end: 7, level: 1 }]],
  ["11 + 3 * 22", []],
  [
    "2 * (5 * (11 + 3) * 22 + 6)",
    [
      { start: 4, end: 26, level: 1 },
      { start: 9, end: 16, level: 2 },
    ],
  ],
] as [string, ParsedParenthesesType[]][])(
  "parenthesesParser(%s) correct cases",
  (line, expected) => {
    test(`returns ${expected}`, () => {
      expect(parenthesesParser(line)).toEqual(expected);
    });
  }
);

describe.each([
  ["2 * (5 * (11 + 3) * 22 + 6"],
  ["2 * )5 * (11 + 3) * 22 + 6)"],
])("parenthesesParser(%s) invalid cases", (line) => {
  test(`Throw Unexpected parentheses!`, () => {
    expect(() => parenthesesParser(line)).toThrow(
      TypeError("Unexpected parentheses!")
    );
  });
});
